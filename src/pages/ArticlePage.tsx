import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { getArticleBySlug, getArticlesBySection, getArticlesByCategory } from "../data/articleRegistry";
import { getCategoryBySlug } from "../data/categories";
import { getSectionBySlug } from "../data/sections";
import Breadcrumb from "../components/Breadcrumb";
import TableOfContents from "../components/TableOfContents";
import FeedbackWidget from "../components/FeedbackWidget";
import {
  Calendar,
  Clock,
  Share2,
  Check,
  FolderOpen,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const breadcrumbItems = [
    { label: category?.title || article.category, href: `/category/${article.category}` },
    ...(section ? [{ label: section.title, href: `/category/${article.category}` }] : []),
    { label: article.title },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <Breadcrumb items={breadcrumbItems} />

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sibling Articles in Section */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-20 hidden lg:block pr-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <FolderOpen className="w-4 h-4 text-[#2196F3]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  In this section
                </h3>
              </div>

              <div className="text-[11px] font-semibold text-slate-400">
                {section?.title || category?.shortTitle}
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
                            ? "font-bold text-[#2196F3] bg-blue-50/90 border-l-2 border-[#2196F3]"
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
                  className="text-[11px] font-bold text-[#2196F3] hover:underline inline-flex items-center gap-1"
                >
                  <span>View all in {category?.shortTitle || category?.title}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Center Column: Article Header, Content & Feedback */}
          <main className="lg:col-span-6 space-y-8 min-w-0">
            {/* Article Header Card */}
            <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#2196F3]">
                <span>{category?.title}</span>
                {section && (
                  <>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-600">{section.title}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              {article.summary && (
                <p className="text-sm text-slate-600 leading-relaxed pt-1">
                  {article.summary}
                </p>
              )}

              {/* Byline metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Verified {article.lastUpdated}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.readTime}</span>
                </div>
                <span>·</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified MantraComply Policy
                </span>
              </div>
            </header>

            {/* Form Wizard Link Banner if targeted */}
            {article.formStepTarget && (
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Sparkles className="w-4 h-4 text-[#2196F3] shrink-0" />
                  <span>
                    Filling out this form in the Credentialing Wizard? Click below to return to your form.
                  </span>
                </div>
                <a
                  href="http://localhost:5173/provider/credentialing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2196F3] text-white font-semibold hover:bg-[#1976D2] whitespace-nowrap shadow-2xs"
                >
                  <span>Open Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Article Body Prose */}
            <article
              className="article-prose bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Feedback Widget */}
            <FeedbackWidget
              articleSlug={article.slug}
              articleTitle={article.title}
            />

            {/* Related Articles Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2196F3]" />
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
                      className="group p-3 rounded-xl border border-slate-200 hover:border-[#2196F3] hover:bg-slate-50 transition-all block"
                    >
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-[#2196F3] line-clamp-2 leading-snug">
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
