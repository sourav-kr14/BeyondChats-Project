const axios = require("axios");
const cheerio = require("cheerio");

const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function search(query) {
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": CHROME_UA,
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Referer": "https://duckduckgo.com/",
      },
      timeout: 5000 
    });

    const $ = cheerio.load(data);
    const links = [];

    $("a.result__a").each((_, el) => {
      const href = $(el).attr("href");
      if (href) {
        if (href.startsWith("http")) {
          links.push(href);
        } else if (href.startsWith("//")) {
          links.push(`https:${href}`);
        }
      }
    });

    return links.slice(0, 2);
  } catch (error) {
    console.error("Search failed:", error.message);
    return [];
  }
}

module.exports = { search };