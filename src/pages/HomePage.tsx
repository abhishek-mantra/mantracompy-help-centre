import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CATEGORIES } from "../data/categories";
import { ARTICLES, getArticlesByCategory } from "../data/articleRegistry";
import CategoryCard from "../components/CategoryCard";
import SearchModal from "../components/SearchModal";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  HelpCircle,
} from "lucide-react";

export function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.title = "MantraComply Help Center — Provider Credentialing & Payer Enrollment";
  }, []);

  const quickSearches = [
    { label: "NPI Requirements", q: "NPI" },
    { label: "CAQH ProView", q: "CAQH" },
    { label: "Malpractice COI", q: "malpractice" },
    { label: "State Licenses", q: "license" },
    { label: "Blue Cross Blue Shield", q: "Blue Cross" },
    { label: "Medicare 855I", q: "Medicare" },
    { label: "Aetna Enrollment", q: "Aetna" },
  ];

  // Key promoted articles for credentialing wizard steps
  const wizardGuides = [
    {
      step: "Step 1",
      slug: "why-npi-is-needed-and-how-to-find-it",
      title: "Why NPI is Needed & How to Verify in NPPES",
      category: "Getting Started",
    },
    {
      step: "Step 2 & 3",
      slug: "caqh-authorization-and-cvo-access",
      title: "CAQH Authorization & CVO Access Explained",
      category: "CAQH & Identity",
    },
    {
      step: "Step 4",
      slug: "primary-source-verification-and-identity",
      title: "Primary Source Verification & Identity Requirements",
      category: "CAQH & Identity",
    },
    {
      step: "Step 5",
      slug: "state-medical-license-verification",
      title: "State Medical License & Board Verification Rules",
      category: "Licenses",
    },
    {
      step: "Step 7",
      slug: "malpractice-insurance-and-coi-requirements",
      title: "Malpractice Insurance Certificate of Insurance (COI)",
      category: "Credentials",
    },
    {
      step: "Step 10",
      slug: "practice-location-and-tax-id-rules",
      title: "Practice Locations, Tax IDs & W-9 Guidelines",
      category: "Practice",
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-[#2196F3]/10 via-[#2196F3]/5 to-transparent border-b border-slate-200/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2196F3] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MantraComply Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How can we help with your <span className="text-[#2196F3]">credentialing</span>?
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Search our comprehensive library of 115+ guides covering NPI verification, CAQH ProView attestations, malpractice requirements, and payer enrollment.
          </p>

          {/* Elevated Search Bar Trigger */}
          <div className="pt-2 max-w-2xl mx-auto">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl shadow-sm text-slate-500 hover:border-[#2196F3] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400 group-hover:text-[#2196F3] transition-colors" />
                <span className="text-sm sm:text-base font-normal">
                  Search guides (e.g. NPI lookup, CAQH attestation, Aetna)...
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <kbd className="px-2 py-1 text-xs font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
                  ⌘K
                </kbd>
              </div>
            </button>
          </div>

          {/* Common Quick Queries */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-700">Frequent searches:</span>
            {quickSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-[#2196F3] underline underline-offset-3 decoration-slate-300 transition-colors cursor-pointer"
              >
                {item.label}
                {idx < quickSearches.length - 1 ? "," : ""}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Wizard Context Banner */}
        <section className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-50 rounded-full blur-2xl pointer-events-none -z-10" />
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 text-[#2196F3] text-xs font-bold uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Provider Wizard Support</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Completing your MantraComply Credentialing Profile?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every step in the 12-stage provider wizard links directly to verified guidance here. Find out why specific documents like CAQH releases, malpractice COIs, or NPIs are requested.
            </p>
          </div>

          <a
            href="http://localhost:5173/provider/credentialing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2196F3] text-white text-xs sm:text-sm font-semibold hover:bg-[#1976D2] shadow-sm transition-all whitespace-nowrap"
          >
            <span>Open Credentialing Wizard</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>

        {/* 3. Credentialing Categories Grid */}
        <section aria-labelledby="categories-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 id="categories-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
                Browse by Topic
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore our organized collection of provider guides, payer requirements, and compliance rules.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500">
              {ARTICLES.length} verified guides available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => {
              const count = getArticlesByCategory(category.slug).length;
              return (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  articleCount={count}
                />
              );
            })}
          </div>
        </section>

        {/* 4. Wizard Step Guides (Direct Onboarding Helpers) */}
        <section aria-labelledby="wizard-steps-heading" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 id="wizard-steps-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
              Essential Step-by-Step Wizard Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Quick answers to the most common questions asked during provider profile setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wizardGuides.map((guide) => (
              <Link
                key={guide.slug}
                to={`/articles/${guide.slug}`}
                className="group bg-white border border-slate-200 hover:border-[#2196F3] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span className="text-[#2196F3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {guide.step}
                    </span>
                    <span>{guide.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2196F3] transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-[#2196F3]">
                  <span>Read guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Support & Direct Assistance Card */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Dedicated Credentialing Coordinators</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need assistance with an active payer application?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If your application is delayed by a payer, or you need help with delegated credentialing rosters or CAQH ProView unlock codes, our team is here to assist.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:support@mantracomply.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                <span>Email Credentialing Support</span>
              </a>
              <a
                href="http://localhost:5173/provider/credentialing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                <span>Check Application Status</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Embedded Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}

export default HomePage;
