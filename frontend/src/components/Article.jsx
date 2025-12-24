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
  
  // --- DATA SELECTION LOGIC ---
  const original = articles.find(a => a?.version?.toLowerCase() === 'original' && a?.content?.length > 0) || articles[0];
  const enhanced = articles.find(a => (a?.version?.toLowerCase() === 'updated' || a?.version?.toLowerCase() === 'enhanced') && a?.id !== original?.id) || articles[articles.length - 1];

  // --- HELPERS ---
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
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
      </div>
      <p className="text-slate-400 font-bold animate-pulse tracking-widest text-xs uppercase text-center">Neural Sync in Progress...</p>
    </div>
  );

  // SHARED STYLES FOR SYMMETRY
  const cardStyle = "relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden min-h-[600px] flex flex-col";
  const glowStyle = "absolute -inset-4 rounded-[3rem] blur-2xl opacity-10 transition duration-1000 animate-pulse";
  const footerBoxStyle = "mt-auto bg-slate-900 rounded-[2rem] p-7 shadow-2xl border border-white/5";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
      
      {/* --- HERO SECTION --- */}
      <section className="relative mb-16 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(99,102,241,0.12)_0%,rgba(255,255,255,0)_100%)]"></div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
          <Zap size={14} className="text-indigo-600 fill-indigo-600" />
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Live Research Pipeline</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          {original?.title || "Intelligent Analysis"}
        </h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* --- LEFT COLUMN: SOURCE --- */}
        <div className="group relative">
          <div className={`${glowStyle} bg-slate-400 group-hover:opacity-20`}></div>
          
          <div className="relative flex items-center justify-between mb-6 px-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-800 rounded-xl text-white shadow-lg">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Source Context</h3>
                <p className="text-[10px] text-slate-500 font-bold leading-none">Original Content</p>
              </div>
            </div>
            <div className="text-[9px] font-black text-slate-400 border border-slate-200 px-2 py-1 rounded">V1.0</div>
          </div>
          
          <div className={cardStyle}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-30"></div>
            
            <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed mb-10">
              <ReactMarkdown>{original?.content || "Fetching baseline article content..."}</ReactMarkdown>
            </div>

            
          </div>
        </div>

        {/* --- RIGHT COLUMN: ENHANCED --- */}
        <div className="group relative">
          <div className={`${glowStyle} bg-indigo-500 group-hover:opacity-20`}></div>
          
          <div className="relative flex items-center justify-between mb-6 px-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-xl shadow-indigo-200">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-indigo-900 uppercase tracking-widest text-[11px]">Enhanced Insight</h3>
                <p className="text-[10px] text-indigo-500 font-bold leading-none">AI Optimized Edition</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[9px] font-black border border-emerald-100">
              <CheckCircle2 size={10} /> VERIFIED
            </div>
          </div>
          
          <div className={cardStyle}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40"></div>
            
            <div className="prose prose-indigo prose-lg max-w-none text-slate-700 leading-relaxed mb-10">
              <ReactMarkdown>{enhanced?.content || "Generating optimized neural output..."}</ReactMarkdown>
            </div>

            {/* SYMMETRICAL FOOTER BOX: REFERENCES */}
            <div className={footerBoxStyle}>
              <div className="flex items-center gap-2 mb-6">
                 <Globe size={16} className="text-indigo-400" />
                 <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em]">Reference Hub</h4>
              </div>
              <div className="space-y-2">
                {getReferences(enhanced?.references).length > 0 ? (
                  getReferences(enhanced.references).map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all group/link">
                      <span className="text-xs text-slate-300 group-hover/link:text-white truncate max-w-[200px] font-bold">
                        {new URL(link).hostname.replace('www.', '')}
                      </span>
                      <ArrowRight size={14} className="text-slate-600 group-hover/link:text-indigo-400 group-hover/link:translate-x-1 transition-all" />
                    </a>
                  ))
                ) : (
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Internal Knowledge Store</span>
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