const axios = require("axios");

const API = process.env.LARAVEL_API;
async function getLatestArticle() {
  const res = await axios.get(`${API}/articles`);
  return res.data.data[0];
}
async function publishArticle(article) {
  try {
    const res = await axios.post(`${API}/articles`, article);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Laravel Error Data:", error.response.data);
      console.error("Laravel Error Status:", error.response.status);
    }
    else
    {
        console.error(error.message);
        
    }
  }
}
module.exports = { getLatestArticle, publishArticle };
