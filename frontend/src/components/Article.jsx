import React from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Sparkles, 
  FileText, 
  Globe, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  Search,
  ExternalLink
} from 'lucide-react';

const Article = ({ articles = [], loading }) => {
  

  const original = articles.find(a => a?.version?.toLowerCase() === 'original' && a?.content?.length > 0) || articles[0];
  
  const enhanced = [...articles]
    .filter(a => (a?.version?.toLowerCase() === 'updated' || a?.version?.toLowerCase() === 'enhanced') && a?.id !== original?.id)
    .sort((a, b) => b.id - a.id)[0] || articles[articles.length - 1];


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
      <div className="h-10 w-10 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin"></div>
      <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase">Loading Data...</p>
    </div>
  );

  const cardStyle = "relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm min-h-[600px] flex flex-col transition-all hover:shadow-md";
  const footerBoxStyle = "mt-auto bg-slate-50 rounded-2xl p-6 border border-slate-100";
  const linkItemStyle = "flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition-colors group/link";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
      
      {/* HERO SECTION  */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
          <Zap size={12} className="text-slate-500 fill-slate-500" />
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Research Pipeline</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          {cleanTitle}
        </h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/*LEFT COLUMN: SOURCE*/}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-5 px-2">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <FileText size={18} />
            </div>
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Source Context</h3>
          </div>
          
          <div className={cardStyle}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200"></div>
            <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed mb-10">
              <ReactMarkdown>{original?.content || "No content found."}</ReactMarkdown>
            </div>

            <div className={footerBoxStyle}>
              <div className="flex items-center gap-2 mb-4">
                 <Search size={14} className="text-slate-400" />
                 <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Discovery Origin</h4>
              </div>
              <div className="space-y-2">
                {original?.source_url ? (
                  <a href={original.source_url} target="_blank" rel="noreferrer" className={linkItemStyle}>
                    <span className="text-xs text-slate-700 font-bold truncate max-w-[200px]">
                      {new URL(original.source_url).hostname}
                    </span>
                    <ExternalLink size={14} className="text-slate-400 group-hover/link:text-blue-500" />
                  </a>
                ) : (
                  <div className="p-3.5 bg-white border border-slate-100 rounded-xl flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Entry</span>
                    <CheckCircle2 size={12} className="text-slate-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*RIGHT COLUMN:*/}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-5 px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Sparkles size={18} />
              </div>
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Enhanced Insight</h3>
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[8px] font-black border border-emerald-200 uppercase">
              Verified
            </div>
          </div>
          
          <div className={cardStyle}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
            <div className="prose prose-blue prose-lg max-w-none text-slate-800 leading-relaxed mb-10">
              <ReactMarkdown>{enhanced?.content || "Awaiting AI output..."}</ReactMarkdown>
            </div>

            <div className={`${footerBoxStyle} bg-blue-50/50 border-blue-100`}>
              <div className="flex items-center gap-2 mb-4">
                 <Globe size={14} className="text-blue-500" />
                 <h4 className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em]">Reference Hub</h4>
              </div>
              <div className="space-y-2">
                {getReferences(enhanced?.references).length > 0 ? (
                  getReferences(enhanced.references).map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noreferrer" className={`${linkItemStyle} hover:border-blue-500`}>
                      <span className="text-xs text-slate-700 font-bold truncate max-w-[200px]">
                        {new URL(link).hostname}
                      </span>
                      <ArrowRight size={14} className="text-slate-300 group-hover/link:text-blue-500 group-hover/link:translate-x-1 transition-all" />
                    </a>
                  ))
                ) : (
                  <div className="p-3.5 bg-white/50 border border-blue-100 rounded-xl text-center">
                    <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Internal Sync Only</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Article;