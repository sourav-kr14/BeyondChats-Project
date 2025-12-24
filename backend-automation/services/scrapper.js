const axios = require("axios");
const cheerio = require("cheerio");

const CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/120.0.0.0 Safari/537.36";

async function scrape(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": CHROME,
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);

    // Remove "noise" (Ads, Nav, etc.)
    $("script, style, nav, footer, header, aside, noscript, iframe, .ads, .sidebar").remove();

    const selectors = ["article", "main", ".content", ".post-body", "#main-content", ".article-content"];
    let text = "";

    for (const selector of selectors) {
      const foundText = $(selector).text().trim();
      if (foundText.length > 200) { 
        text = foundText; // ✅ FIX: You missed this assignment!
        break;
      }
    }

    // Fallback: If no specific container is found, grab the body text
    if (!text || text.length < 200) {
      // We grab 'p' tags specifically for better quality text than just "body"
      text = $("p").map((i, el) => $(el).text()).get().join(" ");
    }
    
    // Final check: if still empty, grab raw body as last resort
    if (!text) text = $("body").text();

    const cleanedText = text.replace(/\s+/g, " ").trim();
    
    // Safety check for DB storage
    if (cleanedText.length < 50) {
        console.warn(`⚠️ Warning: Very little content extracted from ${url}`);
    }

    return cleanedText;
  } catch (err) {
    console.error(`❌ Failed to scrape ${url}: ${err.response?.status || err.message}`);
    return "";
  }
}

module.exports = { scrape };