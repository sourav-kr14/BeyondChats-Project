import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, FileText, Globe, ArrowRight, Zap, CheckCircle2, Search, ExternalLink } from 'lucide-react';

const Article = ({ articles = [], loading, viewMode }) => {
  
  // Selection Logic
  const original = articles.find(a => a?.version?.toLowerCase() === 'original' && a?.content?.length > 0) || articles[0];
  const enhanced = [...articles]
    .filter(a => (a?.version?.toLowerCase() === 'updated' || a?.version?.toLowerCase() === 'enhanced') && a?.id !== original?.id)
    .sort((a, b) => b.id - a.id)[0] || articles[articles.length - 1];

  // Clean Title Logic
  const cleanTitle = (original?.title || enhanced?.title || "Intelligent Analysis")
    .replace(/\s*\(Enhanced\)/gi, '')
    .trim();

  const getReferences = (refs) => {
    if (!refs) return [];
    if (Array.isArray(refs)) return refs;
    try {
      const parsed = typeof refs === 'string' ? JSON.parse(refs) : refs;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
      <div className="h-10 w-10 rounded-full border-2 border-slate-200 border-t-indigo-500 animate-spin"></div>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing...</p>
    </div>
  );

  const cardStyle = "relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm min-h-[600px] flex flex-col";
  const footerBoxStyle = "mt-auto bg-slate-50 rounded-2xl p-6 border border-slate-100";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {cleanTitle}
        </h1>
      </section>

      {/* Grid shifts based on viewMode */}
      <div className={`grid gap-10 ${viewMode === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
        
        {/* SOURCE SECTION */}
        {(viewMode === 'all' || viewMode === 'original') && (
          <div className="flex flex-col transition-all duration-500">
            <div className="flex items-center gap-3 mb-5 px-2">
              <FileText size={18} className="text-slate-400" />
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Source Context</h3>
            </div>
            <div className={cardStyle}>
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200"></div>
              <div className="prose prose-slate prose-sm max-w-none text-slate-600 mb-10">
                <ReactMarkdown>{original?.content || "No content found."}</ReactMarkdown>
              </div>
              <div className={footerBoxStyle}>
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Discovery Origin</h4>
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                  {original?.source_url ? new URL(original.source_url).hostname : "Local Source"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENHANCED SECTION */}
        {(viewMode === 'all' || viewMode === 'enhanced') && (
          <div className="flex flex-col transition-all duration-500">
            <div className="flex items-center justify-between mb-5 px-2">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-indigo-600" />
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Enhanced Insight</h3>
              </div>
              <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[8px] font-black border border-emerald-200">VERIFIED</div>
            </div>
            <div className={cardStyle}>
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500"></div>
              <div className="prose prose-indigo prose-lg max-w-none text-slate-800 mb-10">
                <ReactMarkdown>{enhanced?.content || "Processing..."}</ReactMarkdown>
              </div>
              <div className={`${footerBoxStyle} bg-indigo-50/50 border-indigo-100`}>
                <h4 className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mb-4">Reference Hub</h4>
                <div className="space-y-2">
                  {getReferences(enhanced?.references).length > 0 ? (
                    getReferences(enhanced.references).map((link, i) => (
                      <a key={i} href={link} target="_blank" className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 transition-colors group">
                        <span className="text-xs text-slate-700 font-bold truncate max-w-[200px]">{new URL(link).hostname}</span>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500" />
                      </a>
                    ))
                  ) : (
                    <div className="p-3 bg-white/50 border border-indigo-100 rounded-xl text-center text-[9px] text-indigo-300 font-bold">INTERNAL SYNC</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Article;