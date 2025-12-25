const axios = require("axios");
const cheerio = require("cheerio");

const CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/120.0.0.0 Safari/537.36";

async function scrape(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": CHROME },
      timeout: 15000
    });

    const $ = cheerio.load(data);
   
    const title = $("h1").first().text().trim() || $("title").text().trim();


    $("script, style, nav, footer, header, aside, noscript, iframe, .ads, .sidebar").remove();

    const selectors = ["article", "main", ".content", ".post-body", "#main-content"];
    let content = "";

    for (const selector of selectors) {
      const foundText = $(selector).text().trim();
      if (foundText.length > 200) { 
        content = foundText;
        break;
      }
    }

    if (!content) {
      content = $("p").map((i, el) => $(el).text()).get().join(" ");
    }

    const cleanedContent = content.replace(/\s+/g, " ").trim();
    return {
      title: title,
      content: cleanedContent,
      source_url: url
    };
  } catch (err) {
    console.error(`Failed to scrape ${url}: ${err.message}`);
    return null;
  }
}
module.exports = { scrape };