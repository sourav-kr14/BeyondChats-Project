import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Article from './components/Article';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  // viewMode can be 'all', 'original', or 'enhanced'
  const [viewMode, setViewMode] = useState('all'); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/articles');
      setArticles(res.data.data || res.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onRefresh={fetchData} 
        loading={loading} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />
      <Article 
        articles={articles} 
        loading={loading} 
        viewMode={viewMode} 
      />
    </div>
  );
};

export default App;