import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  FileText,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

const Article = ({ articles = [], loading, viewMode }) => {
  const [copied, setCopied] = useState(false);

  const original =
    articles.find(
      (a) => a?.version?.toLowerCase() === "original" && a?.content?.length > 0
    ) || articles[0];
  const enhanced =
    [...articles]
      .filter(
        (a) =>
          (a?.version?.toLowerCase() === "updated" ||
            a?.version?.toLowerCase() === "enhanced") &&
          a?.id !== original?.id
      )
      .sort((a, b) => b.id - a.id)[0] || articles[articles.length - 1];

  const cleanTitle = (
    original?.title ||
    enhanced?.title ||
    "Intelligent Analysis"
  )
    .replace(/\s*\(Enhanced\)/gi, "")
    .trim();

  const getWordCount = (str) => (str ? str.split(/\s+/).length : 0);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const getReferences = (refs) => {
    if (!refs) return [];
    if (Array.isArray(refs)) return refs;
    try {
      const parsed = typeof refs === "string" ? JSON.parse(refs) : refs;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Processing...
        </p>
      </div>
    );

  const cardStyle =
    "relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm min-h-[600px] flex flex-col";
  const footerBoxStyle =
    "mt-auto bg-slate-50 rounded-2xl p-6 border border-slate-100";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {cleanTitle}
        </h1>
      </section>

      <div
        className={`grid gap-10 ${
          viewMode === "all"
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1 max-w-3xl mx-auto"
        }`}
      >
        {/* SOURCE SECTION */}
        {(viewMode === "all" || viewMode === "original") && (
          <div className="flex flex-col transition-all duration-500">
            <div className="flex items-center justify-between mb-5 px-2">
              <div className="flex items-center gap-3">
                <FileText
                  size={18}
                  className="text-slate-400"
                />
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[15px]">
                  Source Context
                </h3>
              </div>
              <span className="text-[12px] font-bold text-slate-400">
                {getWordCount(original?.content)} words
              </span>
            </div>
            <div className={cardStyle}>
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200"></div>
              <div className="prose prose-slate prose-sm max-w-none text-slate-600 mb-10">
                <ReactMarkdown>
                  {original?.content || "No content found."}
                </ReactMarkdown>
              </div>
              <div className={footerBoxStyle}>
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Discovery Origin
                </h4>
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                  {original?.source_url
                    ? new URL(original.source_url).hostname
                    : "Local Source"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENHANCED SECTION */}
        {(viewMode === "all" || viewMode === "enhanced") && (
          <div className="flex flex-col transition-all duration-500">
            <div className="flex items-center justify-between mb-5 px-2">
              <div className="flex items-center gap-3">
                <Sparkles
                  size={18}
                  className="text-blue-600"
                />
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[15px]">
                  Enhanced Insight
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-bold text-blue-500">
                  {getWordCount(enhanced?.content)} words
                </span>
                <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black border border-emerald-200 uppercase">
                  Verified
                </div>
              </div>
            </div>
            <div className={cardStyle}>
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
              <div className="absolute top-6 right-6 flex gap-2">
                <button
                  onClick={() => handleCopy(enhanced?.content)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                  title="Copy to Clipboard"
                >
                  {copied ? (
                    <Check
                      size={16}
                      className="text-emerald-500"
                    />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              <div className="prose prose-blue prose-lg max-w-none text-slate-800 mb-10">
                <ReactMarkdown>
                  {enhanced?.content || "Processing..."}
                </ReactMarkdown>
              </div>

              <div
                className={`${footerBoxStyle} bg-blue-50/50 border-blue-100`}
              >
                <h4 className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                  Reference Hub
                </h4>
                <div className="space-y-2">
                  {getReferences(enhanced?.references).length > 0 ? (
                    getReferences(enhanced.references).map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group"
                      >
                        <span className="text-xs text-slate-700 font-bold truncate max-w-[200px]">
                          {new URL(link).hostname}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-slate-300 group-hover:text-blue-500"
                        />
                      </a>
                    ))
                  ) : (
                    <div className="p-3 bg-white/50 border border-blue-100 rounded-xl text-center text-[9px] text-blue-400 font-bold">
                      INTERNAL SYNC
                    </div>
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
