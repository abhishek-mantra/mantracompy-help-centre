import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { getCategoryBySlug } from "../data/categories";
import { getSectionsByCategory } from "../data/sections";
import { getArticlesBySection, getArticlesByCategory } from "../data/articleRegistry";
import Breadcrumb from "../components/Breadcrumb";
import {
  Search,
  ChevronRight,
  FolderOpen,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [filterQuery, setFilterQuery] = useState("");

  const category = slug ? getCategoryBySlug(slug) : undefined;

  useEffect(() => {
    if (category) {
      document.title = `${category.title} Guides | MantraComply Help Center`;
    }
  }, [category]);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const sections = getSectionsByCategory(category.slug);
  const totalArticles = getArticlesByCategory(category.slug).length;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: category.title }]} />

        {/* Category Hero Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#2196F3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category Collection</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {category.title}
            </h1>
            <span className="text-xs font-medium text-slate-500">
              {totalArticles} {totalArticles === 1 ? "article" : "articles"}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {category.description}
          </p>

          {/* Quick Filter Bar */}
          <div className="pt-2 max-w-md">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 h-11 focus-within:border-[#2196F3] focus-within:ring-2 focus-within:ring-[#2196F3]/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
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

        {/* Section Groups */}
        <main className="space-y-8">
          {sections.map((section) => {
            const allArticles = getArticlesBySection(section.slug);
            const displayedArticles = allArticles.filter((art) => {
              if (!filterQuery.trim()) return true;
              const q = filterQuery.toLowerCase();
              return (
                art.title.toLowerCase().includes(q) ||
                art.summary.toLowerCase().includes(q) ||
                art.searchKeywords?.some((k) => k.toLowerCase().includes(q))
              );
            });

            if (displayedArticles.length === 0 && filterQuery.trim()) {
              return null;
            }

            return (
              <div
                key={section.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4"
              >
                {/* Section Header */}
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <FolderOpen className="w-4 h-4 text-[#2196F3]" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {section.title}
                    </h2>
                    <span className="text-xs text-slate-400 font-normal">
                      ({displayedArticles.length})
                    </span>
                  </div>
                  {section.description && (
                    <p className="text-xs text-slate-500 mt-1 pl-6.5">
                      {section.description}
                    </p>
                  )}
                </div>

                {/* Article List in this Section */}
                <div className="divide-y divide-slate-100">
                  {displayedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/articles/${article.slug}`}
                      className="group block py-3.5 px-2 hover:bg-slate-50/80 rounded-xl transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400 group-hover:text-[#2196F3] shrink-0 transition-colors" />
                            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-[#2196F3] transition-colors leading-snug">
                              {article.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 pl-6">
                            {article.summary}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 pl-6 pt-1">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                            <span>•</span>
                            <span>Updated {article.lastUpdated}</span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#2196F3] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
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
