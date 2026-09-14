import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { getArticleBySlug, getArticlesBySection } from "../data/articleRegistry";
import { getCategoryBySlug } from "../data/categories";
import { getSectionBySlug } from "../data/sections";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { TableOfContents } from "../components/ui/TableOfContents";
import { FeedbackWidget } from "../components/ui/FeedbackWidget";
import {
  Calendar,
  Clock,
  Share2,
  FolderOpen,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const article = slug ? getArticleBySlug(slug) : undefined;
  const category = article ? getCategoryBySlug(article.category) : undefined;
  const section = article ? getSectionBySlug(article.section) : undefined;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | MantraComply Help Center`;
      window.scrollTo(0, 0);
    }
  }, [article]);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const sectionArticles = getArticlesBySection(article.section);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Article link copied to clipboard");
    });
  };

  const processedContent = useMemo(() => {
    if (!article?.content) return "";
    let html = article.content;

    // Wrap any standalone table not already wrapped by wp-block-table or table-responsive-wrapper
    html = html.replace(
      /(<table[\s\S]*?<\/table>)/gi,
      (match, _p1, offset, fullStr) => {
        const before = fullStr.slice(Math.max(0, offset - 60), offset);
        if (before.includes('class="wp-block-table"') || before.includes("table-responsive-wrapper")) {
          return match;
        }
        return `<div class="table-responsive-wrapper">${match}</div>`;
      }
    );

    return html;
  }, [article?.content]);

  const breadcrumbItems = [
    { label: category?.title || article.category, href: `/category/${article.category}` },
    ...(section ? [{ label: section.title, href: `/category/${article.category}` }] : []),
    { label: article.title },
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

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Sibling Articles in Section */}
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

              <ul className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
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
                  to={`/category/${article.category}`}
                  className="text-[11px] font-bold text-[#043570] hover:underline inline-flex items-center gap-1"
                >
                  <span>View all in {category?.shortTitle || category?.title}</span>
                  <ChevronRight className="size-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Center Column: Article Header, Content & Feedback */}
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
                {article.title}
              </h1>

              {article.summary && (
                <p className="text-sm text-slate-600 leading-relaxed pt-1">
                  {article.summary}
                </p>
              )}

              {/* Byline metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-slate-400" />
                  <span>Verified {article.lastUpdated}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-slate-400" />
                  <span>{article.readTime}</span>
                </div>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">Grounded in Credentialing Rules</span>
              </div>
            </header>

            {/* Form Wizard Link Banner if targeted */}
            {article.formStepTarget && (
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs shadow-2xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Sparkles className="size-4 text-[#00c0ff] shrink-0" />
                  <span>
                    Completing this step in the MantraComply Credentialing Wizard? Click to return to your form.
                  </span>
                </div>
                <a
                  href="https://mantra-comply.vercel.app/provider/credentialing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#043570] hover:bg-[#032a57] text-white font-semibold whitespace-nowrap shadow-2xs transition-colors"
                >
                  <span>Open Form</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}

            {/* Article Body Prose */}
            <article
              className="article-prose bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs leading-relaxed min-w-0 max-w-full overflow-hidden"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Feedback Widget */}
            <div className="pt-2">
              <FeedbackWidget
                articleSlug={article.slug}
                articleTitle={article.title}
              />
            </div>

            {/* Related Articles Box */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="size-4 text-[#043570]" />
                <span>Related Credentialing Guides</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sectionArticles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 4)
                  .map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/articles/${rel.slug}`}
                      className="group p-3.5 rounded-xl border border-slate-200/90 hover:border-[#00c0ff] hover:bg-slate-50 transition-all block"
                    >
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-[#043570] line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 mt-1 inline-block">
                        {rel.readTime}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </main>

          {/* Right Column: Sticky Table of Contents */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-20 hidden lg:block pl-2">
            <TableOfContents items={article.toc || []} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
