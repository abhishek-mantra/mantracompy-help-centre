import React from "react";
import {
  Mail,
  Compass,
  FileCheck2,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import {
  SUPPORT_PHONE,
  SUPPORT_PHONE_TEL,
  SUPPORT_TEMPLATES,
  buildGmailComposeUrl,
} from "../../utils/supportLinks";

export function CustomerSupportGrid() {
  const cards = [
    {
      title: "Credentialing Support",
      description:
        "Send a request to our provider enrollment and CVO team. Typical response within 1 business day.",
      icon: Mail,
      link: buildGmailComposeUrl(SUPPORT_TEMPLATES.credentialing),
      isExternal: true,
      actionText: "Email coordinators",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "CAQH & NPI Onboarding",
      description:
        "Schedule guided assistance with CAQH ProView attestations, 120-day re-attestation, and NPPES taxonomy setup.",
      icon: Compass,
      link: buildGmailComposeUrl(SUPPORT_TEMPLATES.caqh),
      isExternal: true,
      actionText: "Request onboarding help",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50",
    },
    {
      title: "Payer Enrollment Desk",
      description:
        "Get direct support with Medicare PECOS 855I, Medicaid portals, and commercial panel contracting (BCBS, Aetna, Cigna).",
      icon: FileCheck2,
      link: buildGmailComposeUrl(SUPPORT_TEMPLATES.payerEnrollment),
      isExternal: true,
      actionText: "Contact enrollment desk",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Urgent Compliance Hotline",
      description:
        "Fast-track assistance for pending payer committee deadlines, expiring state licenses, or urgent audit notices.",
      icon: PhoneCall,
      link: SUPPORT_PHONE_TEL,
      isExternal: false,
      actionText: `Call ${SUPPORT_PHONE}`,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
    },
  ];

  return (
    <section aria-label="Support and Assistance" className="pt-2">
      {/* 4 Clean Support Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <a
              key={idx}
              href={card.link}
              target={card.isExternal ? "_blank" : undefined}
              rel={card.isExternal ? "noopener noreferrer" : undefined}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#00c0ff] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div
                  className={`size-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#043570] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="text-xs font-bold text-[#043570] inline-flex items-center gap-1 group-hover:text-[#00c0ff] transition-colors pt-2">
                <span>{card.actionText}</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default CustomerSupportGrid;
