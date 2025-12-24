import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, FileText, Globe, ArrowRight, Bookmark } from 'lucide-react';

const Article = ({ articles, loading }) => {
  const original = articles.find(a => a.version === 'original');
  const enhanced = articles.find(a => a.version === 'updated');

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* 1. HERO SECTION: The Eye-Catching Title */}
      <section className="relative mb-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(99,102,241,0.13)_0%,rgba(255,255,255,0)_100%)]"></div>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-100 shadow-sm">
          <Bookmark size={14} /> Knowledge Hub Analysis
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          {original?.title || "Project Insight"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Comparing the original raw data with our optimized AI-driven enhancement.
        </p>
      </section>

      {/* 2. SIDE-BY-SIDE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* LEFT: ORIGINAL (THE FOUNDATION) */}
        <div className="group relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><FileText size={20}/></div>
            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm">Source Content</h3>
          </div>
          <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm transition-all group-hover:shadow-md">
            <div className="prose prose-slate prose-sm max-w-none opacity-80 italic">
              <ReactMarkdown>{original?.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* RIGHT: ENHANCED (THE PREMIUM RESULT) */}
        <div className="group relative">
          {/* Decorative Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.1rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200"><Sparkles size={20}/></div>
            <h3 className="font-bold text-indigo-600 uppercase tracking-widest text-sm">AI Enhanced Edition</h3>
          </div>
          
          <div className="relative bg-white rounded-[2rem] p-10 border border-indigo-100 shadow-xl">
            <div className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-p:leading-relaxed text-slate-700">
              <ReactMarkdown>{enhanced?.content}</ReactMarkdown>
            </div>

            {/* Premium Reference Card */}
            {enhanced?.references && (
              <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={14} /> Fact-Check Sources
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
                </div>
                <div className="space-y-3">
                  {JSON.parse(enhanced.references).map((link, i) => (
                    <a key={i} href={link} target="_blank" className="flex items-center group/link justify-between p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 transition-all">
                      <span className="text-sm font-medium text-slate-600 truncate">{new URL(link).hostname}</span>
                      <ArrowRight size={14} className="text-slate-300 group-hover/link:translate-x-1 group-hover/link:text-indigo-500 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Article;