import React from "react";
import { Link } from "react-router";
import { Video, Sparkles, Users, ArrowRight } from "lucide-react";

export function LearnMoreCards() {
  const cards = [
    {
      title: "Interactive credentialing tour",
      description: "Learn at your own pace with on-demand credentialing modules. Explore the 12-step provider onboarding, CAQH authorization, and license checks.",
      icon: Video,
      link: "/articles/mantracomply-wizard-walkthrough",
      actionText: "Read walkthrough guide",
      badgeColor: "bg-blue-100 text-[#043570]",
      isInternal: true,
    },
    {
      title: "AI verification & CVO masterclass",
      description: "See how automated primary source verification cross-checks state boards, OIG exclusions, and DEA registries to achieve 95% first-time approval.",
      icon: Sparkles,
      link: "/articles/caqh-authorization-and-cvo-access",
      actionText: "Explore AI credentialing",
      badgeColor: "bg-cyan-100 text-[#008cb8]",
      isInternal: true,
    },
    {
      title: "MantraComply Provider Community",
      description: "Connect with credentialing specialists, billing managers, and healthcare compliance directors to share payer enrollment best practices.",
      icon: Users,
      link: "mailto:contact@mantracomply.com",
      actionText: "Join community",
      badgeColor: "bg-emerald-100 text-emerald-800",
      isInternal: false,
    },
  ];

  return (
    <section aria-labelledby="learn-more-heading" className="space-y-6">
      <div className="text-center space-y-1">
        <h2 id="learn-more-heading" className="text-2xl sm:text-3xl font-extrabold text-[#043570] tracking-tight">
          Learn more
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Deep-dive into provider credentialing walkthroughs, automated CVO verifications, and compliance resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const content = (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-2xs hover:shadow-md hover:border-[#00c0ff] transition-all flex flex-col justify-between space-y-6 h-full group">
              <div className="space-y-4">
                <div className={`size-14 rounded-2xl ${card.badgeColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="size-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#043570] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-2 text-xs font-bold text-[#043570] inline-flex items-center gap-1.5 group-hover:text-[#00c0ff] transition-colors">
                <span>{card.actionText}</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );

          return card.isInternal ? (
            <Link key={idx} to={card.link} className="block h-full">
              {content}
            </Link>
          ) : (
            <a key={idx} href={card.link} className="block h-full">
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default LearnMoreCards;
