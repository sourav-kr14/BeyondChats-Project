const axios = require("axios");
const cheerio=require("cheerio");

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

    $("script, style, nav, footer, header, aside, noscript, iframe, ad").remove();

    const selectors = ["article", "main", ".content", ".post-body", "#main-content"];
    let text = "";

    for (const selector of selectors) {
      const foundText = $(selector).text().trim();
      if (foundText.length > 200) { 
        break;
      }
    }


    if (!text) {
      text = $("body").text();
    }

    return text.replace(/\s+/g, " ").trim();
  } catch (err) {
    console.error(`Failed to scrape ${url}: ${err.response?.status || err.message}`);
    return "";
  }
}
module.exports = {scrape};