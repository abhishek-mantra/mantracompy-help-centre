import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { searchArticles } from "../data/articleRegistry";
import { Article } from "../types/helpCenter";
import { CATEGORIES } from "../data/categories";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard shortcut Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          inputRef.current?.focus();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const matches = searchArticles(query);
    setResults(matches);
  }, [query]);

  const handleSelect = (slug: string) => {
    navigate(`/articles/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-20">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-[#2196F3] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search credentialing articles, NPI, CAQH, malpractice, payers..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="ml-2 hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">
              No matching guides found for <strong className="text-slate-900">"{query}"</strong>.
              <div className="mt-2 text-xs text-slate-400">
                Try searching for "NPI", "CAQH", "Aetna", or "Malpractice".
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Articles ({results.length})
              </div>
              {results.map((article) => {
                const cat = CATEGORIES.find((c) => c.slug === article.category);
                return (
                  <button
                    key={article.slug}
                    onClick={() => handleSelect(article.slug)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-[#2196F3] mt-0.5 shrink-0 group-hover:bg-[#2196F3] group-hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-[#2196F3] transition-colors">
                          {article.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {article.summary}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                          <span className="font-medium text-slate-600">{cat?.shortTitle || cat?.title}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2196F3] shrink-0 mt-2 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="p-4">
              <div className="text-xs font-semibold text-slate-500 mb-2.5 uppercase tracking-wider">
                Popular Quick Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Why NPI is needed",
                  "CAQH Authorization",
                  "Malpractice Insurance COI",
                  "State License Verification",
                  "Aetna Credentialing",
                  "Medicare PECOS",
                  "W-9 Requirements",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-[#2196F3] rounded-lg text-xs font-medium text-slate-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
