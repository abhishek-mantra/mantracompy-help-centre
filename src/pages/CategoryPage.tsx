import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { CATEGORIES } from "../data/categories";
import { getSectionsByCategory } from "../data/sections";
import { getArticlesBySection } from "../data/articleRegistry";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Search, ChevronRight, Sparkles, FolderOpen } from "lucide-react";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [filterQuery, setFilterQuery] = useState("");

  const category = slug ? CATEGORIES.find((c) => c.slug === slug) : null;

  useEffect(() => {
    if (category) {
      document.title = `${category.title} Guides | MantraComply Help Center`;
    }
  }, [category]);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const sections = getSectionsByCategory(category.slug);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-soft-tint">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Top Breadcrumb */}
        <Breadcrumb items={[{ label: category.title }]} />

        {/* Category Hero Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-48 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#043570]">
            <Sparkles className="size-3.5 text-[#00c0ff]" />
            <span>Credentialing Category</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#043570] tracking-tight">
            {category.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {category.description}
          </p>

          {/* Quick Filter */}
          <div className="pt-2 max-w-md">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 h-11 focus-within:border-[#00c0ff] focus-within:ring-3 focus-within:ring-[#00c0ff]/15 transition-all">
              <Search className="size-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={`Filter guides in ${category.shortTitle || category.title}...`}
                className="w-full bg-transparent border-0 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden px-2.5 font-medium"
              />
              {filterQuery && (
                <button
                  onClick={() => setFilterQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section-Grouped Article Listing */}
        <main className="space-y-8">
          {sections.map((section) => {
            const allArticles = getArticlesBySection(section.slug);
            // Hide section if it has no articles
            if (allArticles.length === 0) {
              return null;
            }

            const displayedArticles = allArticles.filter((art) => {
              if (!filterQuery.trim()) return true;
              const q = filterQuery.toLowerCase();
              return (
                art.title.toLowerCase().includes(q) ||
                art.summary.toLowerCase().includes(q) ||
                art.searchKeywords?.some((k) => k.toLowerCase().includes(q))
              );
            });

            // Hide section if filter query leaves 0 articles
            if (displayedArticles.length === 0) {
              return null;
            }

            return (
              <div
                key={section.slug}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-4"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <FolderOpen className="size-4.5 text-[#043570]" />
                    <h2 className="text-base sm:text-lg font-bold text-[#043570]">
                      {section.title}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {displayedArticles.length} {displayedArticles.length === 1 ? "guide" : "guides"}
                  </span>
                </div>

                {/* Section Articles */}
                <div className="space-y-3 pt-1">
                  {displayedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/articles/${article.slug}`}
                      className="bg-slate-50/70 hover:bg-blue-50/60 rounded-2xl border border-slate-200/80 hover:border-[#00c0ff] p-4.5 transition-all flex items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#043570] transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="size-8 rounded-full bg-white group-hover:bg-blue-100 text-slate-400 group-hover:text-[#043570] flex items-center justify-center transition-colors border border-slate-200/60 shrink-0">
                        <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default CategoryPage;
