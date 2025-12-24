require("dotenv").config();

const {
  getLatestArticle,
  publishArticle,
} = require("./services/laravelApi");
const { search } = require("./services/googleSearch");
const { scrape } = require("./services/scrapper"); // Ensure folder is named 'scrapper'
const { rewrite } = require("./services/llm");

(async () => {
  try {

    const article = await getLatestArticle();
    if (!article) return console.log("No article found.");
    console.log("Processing article:", article.title);


    const links = await search(article.title);
    if (!links || links.length === 0) {
      console.log(" No related links found.");
      return;
    }
    console.log(` Found ${links.length} potential references.`);


    console.log(" Starting scraping process...");
  
    const scrapeResults = await Promise.all(
      links.slice(0, 3).map(async (link) => {
        try {
      
          let cleanLink = link;
          if (link.includes("uddg=")) {
            const urlParams = new URLSearchParams(link.split("?")[1]);
            cleanLink = decodeURIComponent(urlParams.get("uddg"));
          }

          console.log(` Scraping Clean Link: ${cleanLink}`);
          const content = await scrape(cleanLink);

          if (content && content.length > 300) {
            return { link: cleanLink, text: content.substring(0, 6000) };
          }
          return null;
        } catch (e) {
          return null;
        }
      })
    );

 
    const validData = scrapeResults.filter((r) => r !== null);

    if (validData.length < 1) {
      console.log(
        " Pipeline Stopped: No valid content could be extracted from any links."
      );
      return;
    }

    console.log(`Sending ${validData.length} sources to Groq for rewriting...`);
    const update = await rewrite(
      article.title,
      validData.map((d) => d.text),
      validData.map((d) => d.link)
    );

  
    const uniqueSlug = `${article.slug}-enhanced-${Date.now()}`;
    await publishArticle({
      original_id: article.id,
      title: `${article.title} (Enhanced)`,
      content: update,
      slug: uniqueSlug,
      version: "updated",
      references: JSON.stringify(validData.map((d) => d.link)),
    });

    console.log("Published successfully!");
  } catch (err) {
    console.error("Pipeline Error:", err.stack);
  }
})();
