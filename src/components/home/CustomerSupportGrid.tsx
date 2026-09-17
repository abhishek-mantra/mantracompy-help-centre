import React, { useState } from "react";
import {
  Mail,
  Compass,
  FileCheck2,
  PhoneCall,
  ArrowRight,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_TEL,
  SUPPORT_TEMPLATES,
  buildGmailComposeUrl,
  openBitrix24LiveChat,
} from "../../utils/supportLinks";

export function CustomerSupportGrid() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLiveChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openBitrix24LiveChat();
  };

  const cards = [
    {
      id: "credentialing",
      title: "Credentialing Support",
      description:
        "Send a request to our provider enrollment and CVO team. Typical response within 1 business day.",
      icon: Mail,
      gmailUrl: buildGmailComposeUrl(SUPPORT_TEMPLATES.credentialing),
      primaryActionText: "Email coordinators (Gmail)",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      accentHover: "hover:border-blue-400",
    },
    {
      id: "caqh",
      title: "CAQH & NPI Onboarding",
      description:
        "Schedule guided assistance with CAQH ProView attestations, 120-day re-attestation, and NPPES taxonomy setup.",
      icon: Compass,
      gmailUrl: buildGmailComposeUrl(SUPPORT_TEMPLATES.caqh),
      primaryActionText: "Request onboarding help (Gmail)",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50",
      accentHover: "hover:border-cyan-400",
    },
    {
      id: "payer",
      title: "Payer Enrollment Desk",
      description:
        "Get direct support with Medicare PECOS 855I, Medicaid portals, and commercial panel contracting (BCBS, Aetna, Cigna).",
      icon: FileCheck2,
      gmailUrl: buildGmailComposeUrl(SUPPORT_TEMPLATES.payerEnrollment),
      primaryActionText: "Contact enrollment desk (Gmail)",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      accentHover: "hover:border-emerald-400",
    },
    {
      id: "urgent",
      title: "Urgent Compliance Hotline",
      description:
        "Fast-track assistance for pending payer committee deadlines, expiring state licenses, or urgent audit notices.",
      icon: PhoneCall,
      callLink: SUPPORT_PHONE_TEL,
      gmailUrl: buildGmailComposeUrl(SUPPORT_TEMPLATES.urgentCompliance),
      primaryActionText: `Call ${SUPPORT_PHONE}`,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      accentHover: "hover:border-rose-400",
    },
  ];

  return (
    <section aria-label="Support and Assistance" className="pt-2">
      {/* 4 Clean Support Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const isUrgent = card.id === "urgent";

          return (
            <div
              key={card.id}
              className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md ${card.accentHover} transition-all flex flex-col justify-between space-y-4`}
            >
              {/* Card Header & Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`size-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center`}
                  >
                    <Icon className="size-5" />
                  </div>

                  {/* Bitrix24 Quick Chat Pill */}
                  <button
                    type="button"
                    onClick={handleLiveChatClick}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors cursor-pointer border border-emerald-200/60"
                    title="Open Bitrix24 Live Chat"
                  >
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <MessageSquare className="size-3" />
                    <span>Live Chat</span>
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Actions Area */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {isUrgent ? (
                  <div className="space-y-1.5">
                    <a
                      href={card.callLink}
                      className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <PhoneCall className="size-3.5" />
                      <span>{card.primaryActionText}</span>
                    </a>

                    <a
                      href={card.gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-2 text-[11px] font-semibold text-slate-600 hover:text-rose-600 inline-flex items-center justify-center gap-1 transition-colors"
                      title="Opens Gmail compose with pre-filled urgent details"
                    >
                      <Mail className="size-3" />
                      <span>Or email urgent desk (Gmail)</span>
                      <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <a
                      href={card.gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#043570] hover:bg-[#002855] text-white font-bold text-xs inline-flex items-center justify-between transition-colors shadow-2xs group"
                      title="Opens Gmail compose with pre-filled template"
                    >
                      <span className="truncate">{card.primaryActionText}</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>

                    <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                      <span className="truncate">To: {SUPPORT_EMAIL}</span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="text-slate-500 hover:text-[#043570] inline-flex items-center gap-1 shrink-0 cursor-pointer font-medium"
                        title="Copy email address to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CustomerSupportGrid;
