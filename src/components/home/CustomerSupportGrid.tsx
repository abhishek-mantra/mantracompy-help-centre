import React from "react";
import { Mail, Compass, FileCheck2, PhoneCall, ArrowRight } from "lucide-react";
import {
  SUPPORT_PHONE,
  SUPPORT_PHONE_TEL,
  SUPPORT_TEMPLATES,
  buildGmailComposeUrl,
} from "../../utils/supportLinks";

export function CustomerSupportGrid() {
  const supportChannels = [
    {
      id: "credentialing",
      title: "Credentialing Desk",
      subtitle: "Provider enrollment & CVO review",
      icon: Mail,
      link: buildGmailComposeUrl(SUPPORT_TEMPLATES.credentialing),
      isExternal: true,
      actionText: "Email coordinators",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-100",
    },
    {
      id: "caqh",
      title: "CAQH & NPI Setup",
      subtitle: "Attestation & taxonomy guidance",
      icon: Compass,
      link: buildGmailComposeUrl(SUPPORT_TEMPLATES.caqh),
      isExternal: true,
      actionText: "Request setup help",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50 border-cyan-100",
    },
    {
      id: "payer",
      title: "Payer Enrollment",
      subtitle: "Medicare, Medicaid & commercial",
      icon: FileCheck2,
      link: buildGmailComposeUrl(SUPPORT_TEMPLATES.payerEnrollment),
      isExternal: true,
      actionText: "Contact payer desk",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-100",
    },
    {
      id: "urgent",
      title: "Urgent Hotline",
      subtitle: "Committee deadlines & audits",
      icon: PhoneCall,
      link: SUPPORT_PHONE_TEL,
      isExternal: false,
      actionText: `Call ${SUPPORT_PHONE}`,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 border-rose-100",
      isUrgent: true,
    },
  ];

  return (
    <section aria-label="Support and Assistance" className="pt-2">
      {/* Cohesive, Focused Support Hub Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Clean Header: Instant context without reading walls of text */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#043570] tracking-tight">
              Still have questions? Talk to our team.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct access to our provider enrollment coordinators. Typical response within 1 business day.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold self-start sm:self-center shrink-0">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Coordinators on duty</span>
          </div>
        </div>

        {/* 4 Compact, Ultra-Scannable Action Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {supportChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.id}
                href={channel.link}
                target={channel.isExternal ? "_blank" : undefined}
                rel={channel.isExternal ? "noopener noreferrer" : undefined}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group ${
                  channel.isUrgent
                    ? "bg-rose-50/25 border-rose-200/80 hover:bg-rose-50/50 hover:border-rose-300"
                    : "bg-slate-50/60 border-slate-200/70 hover:bg-white hover:border-[#00c0ff] hover:shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`size-10 rounded-xl border ${channel.iconBg} ${channel.iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#043570] transition-colors leading-tight">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {channel.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`text-xs font-bold inline-flex items-center gap-1 transition-colors pt-1 ${
                    channel.isUrgent
                      ? "text-rose-600 group-hover:text-rose-700"
                      : "text-[#043570] group-hover:text-[#00c0ff]"
                  }`}
                >
                  <span>{channel.actionText}</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomerSupportGrid;
