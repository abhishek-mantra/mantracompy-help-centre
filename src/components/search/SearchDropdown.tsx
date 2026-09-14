import React from "react";
import { Link } from "react-router";
import { ArrowRight, FileText } from "lucide-react";
import { Article } from "../../types/helpCenter";
import { CATEGORIES } from "../../data/categories";

interface SearchDropdownProps {
  results: Article[];
  query: string;
  selectedIndex: number;
  onSelectResult: () => void;
  onViewAllResults: () => void;
  isOpen: boolean;
}

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <>{text}</>;
  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-cyan-100 text-[#043570] font-bold rounded-xs px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SearchDropdown({
  results,
  query,
  selectedIndex,
  onSelectResult,
  onViewAllResults,
  isOpen,
}: SearchDropdownProps) {
  if (!isOpen || !query.trim()) return null;

  return (
    <div
      role="listbox"
      id="search-results-list"
      aria-label="Search results suggestions"
      className="absolute left-0 right-0 top-full mt-2.5 bg-white rounded-2xl border border-slate-200 shadow-2xl ring-1 ring-black/5 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left"
    >
      <div className="p-3 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-4.5 bg-slate-50/90 font-medium">
        <span className="font-bold text-slate-700">Verified Credentialing Guides ({results.length} found)</span>
        <span className="hidden sm:inline font-mono">Use ↑ ↓ to navigate · Enter to select</span>
      </div>

      {results.length === 0 ? (
        <div className="p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            No guides found for "{query}"
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Try searching for <strong>NPI verification</strong>, <strong>CAQH ProView</strong>, <strong>Malpractice COI</strong>, <strong>Medicare 855I</strong>, or <strong>State Licenses</strong>.
          </p>
        </div>
      ) : (
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100">
          {results.slice(0, 6).map((article, index) => {
            const isSelected = index === selectedIndex;
            const category = CATEGORIES.find((c) => c.slug === article.category);

            return (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                onClick={onSelectResult}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl transition-all ${
                  isSelected
                    ? "bg-blue-50/90 text-[#043570] ring-1 ring-blue-200"
                    : "hover:bg-slate-50 text-slate-800"
                }`}
              >
                <div className="p-2 rounded-xl bg-blue-50 text-[#043570] shrink-0 mt-0.5 border border-blue-100 shadow-2xs">
                  <FileText className="size-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#043570] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/80">
                      {category?.shortTitle || category?.title || article.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold truncate text-slate-900 leading-snug">
                    <HighlightText text={article.title} highlight={query} />
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-relaxed">
                    <HighlightText text={article.summary} highlight={query} />
                  </p>
                </div>

                <ArrowRight className="size-4 text-slate-400 shrink-0 self-center" />
              </Link>
            );
          })}
        </div>
      )}

      {results.length > 0 && (
        <div className="p-3 bg-slate-50/90 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onViewAllResults}
            className="text-xs font-bold text-[#043570] hover:text-[#00c0ff] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View all {results.length} results</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
