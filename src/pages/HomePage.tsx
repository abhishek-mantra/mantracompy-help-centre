import React, { useEffect } from "react";
import { Link } from "react-router";
import { SearchBar } from "../components/search/SearchBar";
import { ARTICLE_REGISTRY } from "../data/articleRegistry";
import { LearnMoreCards } from "../components/home/LearnMoreCards";
import { CustomerSupportGrid } from "../components/home/CustomerSupportGrid";
import { Star } from "lucide-react";

export function HomePage() {
  useEffect(() => {
    document.title = "MantraComply Help Center — Credentialing Guides & Compliance Knowledge Base";
  }, []);

  const commonSearches = [
    { label: "NPI Lookup", query: "NPI" },
    { label: "CAQH ProView", query: "CAQH" },
    { label: "State Licenses", query: "license" },
    { label: "Malpractice COI", query: "malpractice" },
    { label: "Medicare 855I", query: "Medicare" },
    { label: "Aetna Enrollment", query: "Aetna" },
    { label: "Blue Cross Blue Shield", query: "Blue Cross" },
  ];

  // 9 distinct 3x3 verified credentialing domain & workflow tiles
  const credentialingTiles = [
    {
      title: "Getting started & NPI verification",
      href: "/category/getting-started-npi",
    },
    {
      title: "Provider wizard walkthrough",
      href: "/articles/why-npi-is-needed-and-how-to-find-it",
    },
    {
      title: "CAQH ProView & 120-day attestations",
      href: "/category/caqh-identity",
    },
    {
      title: "Primary source identity & CVO access",
      href: "/category/caqh-identity",
    },
    {
      title: "State medical licenses & DEA checks",
      href: "/category/licenses-certifications",
    },
    {
      title: "Malpractice COI & board certifications",
      href: "/category/licenses-certifications",
    },
    {
      title: "Commercial health plans (BCBS, Aetna, Cigna)",
      href: "/category/health-plans-payers",
    },
    {
      title: "Medicare PECOS 855I & Medicaid enrollment",
      href: "/category/health-plans-payers",
    },
    {
      title: "Practice locations, W-9 & compliance rules",
      href: "/category/practice-compliance",
    },
  ];

  // Key promoted guides for daily credentialing operations
  const promotedArticles = [
    ARTICLE_REGISTRY.find((a) => a.slug === "why-npi-is-needed-and-how-to-find-it"),
    ARTICLE_REGISTRY.find((a) => a.slug === "caqh-authorization-and-cvo-access"),
    ARTICLE_REGISTRY.find((a) => a.slug === "how-to-fill-out-caqh-in-2026"),
    ARTICLE_REGISTRY.find((a) => a.slug === "primary-source-verification-and-identity"),
    ARTICLE_REGISTRY.find((a) => a.slug === "state-medical-license-verification"),
    ARTICLE_REGISTRY.find((a) => a.slug === "malpractice-insurance-and-coi-requirements"),
    ARTICLE_REGISTRY.find((a) => a.slug === "practice-location-and-tax-id-rules"),
    ARTICLE_REGISTRY.find((a) => a.slug === "choosing-commercial-vs-government-health-plans"),
  ].filter(Boolean);

  return (
    <div className="space-y-16 pb-20 bg-soft-tint min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative z-20 bg-hero-warm text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 shadow-md text-center">
        {/* Contained Ambient Highlights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 right-1/4 size-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-blue-400/15 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-[11px] font-bold tracking-wide uppercase">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Welcome to the Help Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Hi, how can we help you today?
          </h1>

          {/* Elevated Pill Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <SearchBar size="large" placeholder="Search guides, NPI, CAQH, or payer enrollment..." />
          </div>

          {/* Common Search Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-200 pt-1">
            <span className="font-semibold text-white">Common searches:</span>
            {commonSearches.map((item, idx) => (
              <Link
                key={idx}
                to={`/search?q=${encodeURIComponent(item.query)}`}
                className="hover:text-cyan-300 underline underline-offset-3 decoration-slate-300/60 transition-colors"
              >
                {item.label}
                {idx < commonSearches.length - 1 ? "," : ""}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. 3x3 Clean Category Tiles (Top-Left Title + Hover Underline) */}
        <section aria-label="Credentialing Categories">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {credentialingTiles.map((tile, idx) => (
              <Link
                key={idx}
                to={tile.href}
                className="bg-white hover:bg-[#F8FBFE] border-2 border-slate-200/90 hover:border-[#00c0ff] rounded-3xl p-7 sm:p-8 min-h-[140px] sm:min-h-[155px] flex flex-col justify-start shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all group"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#043570] group-hover:underline underline-offset-4 decoration-2 decoration-[#043570] transition-all leading-snug">
                  {tile.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Promoted Articles */}
        <section aria-labelledby="promoted-heading" className="space-y-6 pt-2">
          <h2
            id="promoted-heading"
            className="text-2xl sm:text-3xl font-extrabold text-center text-[#043570] tracking-tight"
          >
            Promoted articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 max-w-5xl mx-auto pt-2">
            {promotedArticles.map((art) => (
              <Link
                key={art!.slug}
                to={`/articles/${art!.slug}`}
                className="group flex items-start gap-2.5 py-2.5 border-b border-slate-200/80 hover:border-blue-200 transition-colors"
              >
                <Star className="size-4 text-amber-400 fill-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#043570] group-hover:underline underline-offset-2 transition-colors leading-snug">
                  {art!.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Learn More Cards */}
        <LearnMoreCards />

        {/* 5. Support Resources */}
        <CustomerSupportGrid />
      </main>
    </div>
  );
}

export default HomePage;
