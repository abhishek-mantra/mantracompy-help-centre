import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { Search, X, ChevronRight, Sparkles } from "lucide-react";
import { ARTICLE_REGISTRY, searchArticles } from "../data/articleRegistry";
import { CATEGORIES } from "../data/categories";
import { Breadcrumb } from "../components/ui/Breadcrumb";

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim() || !text) return <>{text}</>;
  const tokens = highlight
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (tokens.length === 0) return <>{text}</>;

  const escapedTokens = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTokens.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        tokens.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
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

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const [queryInput, setQueryInput] = useState(rawQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setQueryInput(rawQuery);
    document.title = rawQuery.trim()
      ? `Search results for "${rawQuery}" | MantraComply Help Center`
      : "Search Credentialing Guides | MantraComply Help Center";
  }, [rawQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: queryInput.trim() });
  };

  const searchResults = useMemo(() => {
    return searchArticles(rawQuery, selectedCategory);
  }, [rawQuery, selectedCategory]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-soft-tint">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Breadcrumb */}
        <Breadcrumb items={[{ label: "Search Results" }]} />

        {/* Search Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#043570]">
            <Sparkles className="size-3.5 text-[#00c0ff]" />
            <span>Search Documentation</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {rawQuery.trim() ? (
              <>Search results for <span className="text-[#043570]">"{rawQuery}"</span></>
            ) : (
              "Search Credentialing Guides & Documentation"
            )}
          </h1>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-2xl">
            <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3.5 h-12 focus-within:border-[#00c0ff] focus-within:ring-3 focus-within:ring-[#00c0ff]/15 transition-all">
              <Search className="size-4.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Search by NPI, CAQH, payer, state license, or topic..."
                className="w-full bg-transparent border-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden px-2.5 font-medium"
              />
              {queryInput && (
                <button
                  type="button"
                  onClick={() => {
                    setQueryInput("");
                    setSearchParams({});
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 h-12 rounded-xl bg-gradient-to-r from-[#043570] to-[#084b96] hover:from-[#032a57] hover:to-[#043570] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-500 font-semibold mr-1">Filter by category:</span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#043570] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Guides ({ARTICLE_REGISTRY.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-[#043570] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.shortTitle || cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <main className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Matching Guides ({searchResults.length})
            </h2>
            {rawQuery && (
              <span className="text-xs text-slate-400 font-medium">Sorted by relevance</span>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No results found for "{rawQuery}".
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Check for typos or try searching by credentialing term (e.g. <strong>NPI Lookup</strong>, <strong>CAQH ProView</strong>, <strong>Malpractice COI</strong>, <strong>Medicare 855I</strong>, <strong>DEA</strong>).
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {searchResults.map((article) => {
                const category = CATEGORIES.find((c) => c.slug === article.category);
                return (
                  <Link
                    key={article.slug}
                    to={`/articles/${article.slug}`}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-[#043570]/60 hover:shadow-xs transition-all flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#043570] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/80">
                          {category?.shortTitle || category?.title || article.category}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#043570] transition-colors leading-snug">
                        <HighlightText text={article.title} highlight={rawQuery} />
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        <HighlightText text={article.summary} highlight={rawQuery} />
                      </p>
                    </div>

                    <div className="size-8 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-[#043570] flex items-center justify-center transition-colors shrink-0">
                      <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SearchPage;
