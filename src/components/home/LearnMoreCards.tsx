import React from "react";
import { Link } from "react-router";
import { Video, Sparkles, FileText, ArrowRight } from "lucide-react";

export function LearnMoreCards() {
  const cards = [
    {
      title: "Interactive Credentialing Tour",
      description: "Step through the 12-step onboarding wizard with live field validations.",
      icon: Video,
      link: "/tour",
      actionText: "Launch interactive tour",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-100",
    },
    {
      title: "AI Verification & CVO Masterclass",
      description: "How automated primary source checks verify state boards & OIG for 95% approval.",
      icon: Sparkles,
      link: "/articles/ai-verification-and-cvo-masterclass",
      actionText: "Read CVO masterclass",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50 border-cyan-100",
    },
    {
      title: "12-Step Wizard Walkthrough",
      description: "Complete checklist of required forms, document uploads, and audit milestones.",
      icon: FileText,
      link: "/articles/mantracomply-wizard-walkthrough",
      actionText: "View wizard guide",
      iconColor: "text-emerald-700",
      iconBg: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <section aria-labelledby="learn-more-heading" className="space-y-6">
      <div className="text-center space-y-1">
        <h2 id="learn-more-heading" className="text-2xl sm:text-3xl font-extrabold text-[#043570] tracking-tight">
          Featured Guides &amp; Walkthroughs
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Explore interactive demos, automated verification guides, and compliance checklists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md hover:border-[#00c0ff] transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div
                  className={`size-11 rounded-xl border ${card.iconBg} ${card.iconColor} flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs`}
                >
                  <Icon className="size-5.5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#043570] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-2 text-xs font-bold text-[#043570] inline-flex items-center gap-1.5 group-hover:text-[#00c0ff] transition-colors">
                <span>{card.actionText}</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LearnMoreCards;
