require("dotenv").config();

const {
  getArticles, 
  publishArticle,
} = require("./services/laravelApi");
const { search } = require("./services/googleSearch");
const { scrape } = require("./services/scrapper");
const { rewrite } = require("./services/llm");

(async () => {
  try {
    const articles = await getArticles(); 
    console.log(`Total articles in DB: ${articles.length}`);
    const originalArticles = articles
      .filter(a => a.version && a.version.toLowerCase().trim() === 'original')
      .slice(0, 5);

    if (originalArticles.length === 0) {
      return console.log("No original articles found. Check your database 'version' column.");
    }

    console.log(`Processing ${originalArticles.length} articles...`);

    for (const article of originalArticles) {
      console.log(`\n--- 📄 Processing: ${article.title} ---`);

      const links = await search(article.title);
      const organicLinks = (links || []).filter(link => 
        !link.includes("duckduckgo.com/y.js") && 
        !link.includes("googleadservices") &&
        !link.includes("bing.com/aclick")
      );

      if (organicLinks.length === 0) {
        console.log(`Skipping: No organic references found.`);
        continue;
      }

      const targetLinks = organicLinks.slice(0, 2); 
      console.log(`Found ${targetLinks.length} organic references. Scraping...`);
      
      const scrapeResults = await Promise.all(
        targetLinks.map(async (link) => {
          try {
            let cleanLink = link;
            if (link.includes("uddg=")) {
              const urlParams = new URLSearchParams(link.split("?")[1]);
              cleanLink = decodeURIComponent(urlParams.get("uddg"));
            }

            const content = await scrape(cleanLink);
            if (content && content.length > 300) {
              return { 
                link: cleanLink, 
                text: content.substring(0, 6000) 
              };
            }
            return null;
          } catch (e) {
            return null;
          }
        })
      );

      const validData = scrapeResults.filter((r) => r !== null);

      if (validData.length < 1) {
        console.log(`Skipping: No valid content extracted from organic links.`);
        continue;
      }

      console.log(`Sending to LLM for enhancement...`);
      const updatedContent = await rewrite(
        article.title,
        validData.map((d) => d.text),
        validData.map((d) => d.link)
      );

      const payload = {
        original_id: article.id,
        title: `${article.title} (Enhanced)`,
        slug: `${article.slug || 'article'}-enhanced-${Date.now()}`, 
        content: updatedContent,
        version: "updated",
        source_url: article.source_url,
        references: JSON.stringify(validData.map((d) => d.link)), 
      };

      await publishArticle(payload);
      console.log(`Successfully published: ${article.title}`);
    }

    console.log("\m Pipeline Complete: All 5 articles enhanced.");
  } catch (err) {
    console.error("Critical Pipeline Error:", err.stack);
  }
})();