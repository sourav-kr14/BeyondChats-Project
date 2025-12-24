import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import MainContent from './components/Article';
import Footer from './components/Footer';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/articles');
      setArticles(res.data.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onRefresh={fetchArticles} loading={loading} />
      
      <MainContent articles={articles} />
      
      <Footer />
    </div>
  );
}

export default App;