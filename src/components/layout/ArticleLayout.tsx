import React from "react";
import { Link } from "react-router";
import { Breadcrumb } from "../ui/Breadcrumb";
import { FeedbackWidget } from "../ui/FeedbackWidget";
import { TableOfContents } from "../ui/TableOfContents";
import { TocItem, CategorySlug } from "../../types/helpCenter";
import { CATEGORIES } from "../../data/categories";
import { ARTICLE_REGISTRY, getSiblingArticles } from "../../data/articleRegistry";
import { getSectionBySlug } from "../../data/sections";
import { Calendar, ChevronRight, FolderOpen, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ArticleLayoutProps {
  slug: string;
  title: string;
  categorySlug: CategorySlug;
  readTime?: string;
  lastUpdated?: string;
  tocItems?: TocItem[];
  children: React.ReactNode;
}

export function ArticleLayout({
  slug,
  title,
  categorySlug,
  lastUpdated = "September 2026",
  tocItems = [],
  children,
}: ArticleLayoutProps) {
  const currentArticle = ARTICLE_REGISTRY.find((a) => a.slug === slug);
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const section = currentArticle ? getSectionBySlug(currentArticle.section) : null;
  const sectionArticles = getSiblingArticles(slug);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Article link copied to clipboard");
    });
  };

  const breadcrumbItems = [
    { label: category?.title || categorySlug, href: `/category/${categorySlug}` },
    ...(section ? [{ label: section.title, href: `/category/${categorySlug}` }] : []),
    { label: title },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-soft-tint">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Breadcrumb: Home > Category > Section > Article */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <Breadcrumb items={breadcrumbItems} />

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
          >
            <Share2 className="size-3.5 text-slate-500" />
            <span>Share Guide</span>
          </button>
        </div>

        {/* 3-Column Grid: Section Siblings (Col 1-3) + Article Main (Col 4-9) + TOC (Col 10-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Sidebar: Articles in this Section */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-20 hidden lg:block pr-2">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <FolderOpen className="size-4 text-[#043570]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Articles in this section
                </h3>
              </div>

              <div className="text-[11px] font-semibold text-slate-400">
                {section?.title || category?.shortTitle || category?.title}
              </div>

              <ul className="space-y-1 text-xs">
                {sectionArticles.map((art) => {
                  const isActive = art.slug === slug;
                  return (
                    <li key={art.slug}>
                      <Link
                        to={`/articles/${art.slug}`}
                        className={`block py-1.5 px-2.5 rounded-lg transition-all leading-snug ${
                          isActive
                            ? "font-bold text-[#043570] bg-blue-50/90 border-l-2 border-[#043570]"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {art.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  to={`/category/${categorySlug}`}
                  className="text-[11px] font-bold text-[#043570] hover:underline inline-flex items-center gap-1"
                >
                  <span>View all in {category?.shortTitle || category?.title}</span>
                  <ChevronRight className="size-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article Container */}
          <main className="lg:col-span-6 xl:col-span-6 space-y-8 min-w-0">
            {/* Article Header Card */}
            <header className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#043570]">
                <span>{category?.title}</span>
                {section && (
                  <>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-600">{section.title}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>

              {/* Byline metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-slate-400" />
                  <span>Verified {lastUpdated}</span>
                </div>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">Grounded in Credentialing Rules</span>
              </div>
            </header>

            {/* Article Body */}
            <article className="article-prose bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs leading-relaxed min-w-0 max-w-full overflow-hidden">
              {children}
            </article>

            {/* Feedback Widget */}
            <div className="pt-4 border-t border-slate-200/80">
              <FeedbackWidget articleSlug={slug} articleTitle={title} />
            </div>
          </main>

          {/* Right Floating TOC */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-20 hidden lg:block pl-2">
            <TableOfContents items={tocItems} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ArticleLayout;
