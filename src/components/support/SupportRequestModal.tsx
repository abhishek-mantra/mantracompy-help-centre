import React, { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  Mail,
  PhoneCall,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_TEL,
  SUPPORT_TEMPLATES,
  buildGmailComposeUrl,
  buildMailtoUrl,
  openBitrix24LiveChat,
} from "../../utils/supportLinks";

interface SupportRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: "general" | "credentialing" | "caqh" | "payerEnrollment" | "urgentCompliance";
}

export function SupportRequestModal({
  isOpen,
  onClose,
  defaultCategory = "general",
}: SupportRequestModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<
    "general" | "credentialing" | "caqh" | "payerEnrollment" | "urgentCompliance"
  >(defaultCategory);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultCategory) setSelectedTopic(defaultCategory);
  }, [defaultCategory, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTemplate =
    selectedTopic === "credentialing"
      ? SUPPORT_TEMPLATES.credentialing
      : selectedTopic === "caqh"
      ? SUPPORT_TEMPLATES.caqh
      : selectedTopic === "payerEnrollment"
      ? SUPPORT_TEMPLATES.payerEnrollment
      : selectedTopic === "urgentCompliance"
      ? SUPPORT_TEMPLATES.urgentCompliance
      : SUPPORT_TEMPLATES.generalRequest;

  const gmailUrl = buildGmailComposeUrl(currentTemplate);
  const mailtoUrl = buildMailtoUrl(currentTemplate);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleStartLiveChat = () => {
    openBitrix24LiveChat();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-linear-to-r from-[#043570] to-[#004b9e] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00c0ff]/20 text-[#00c0ff] border border-[#00c0ff]/30">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Support Center
            </span>
          </div>

          <h2 id="support-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
            How can we help you today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
            Choose your preferred channel below to connect immediately with our provider credentialing specialists.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Topic Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select inquiry topic (autofills email template)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "general", label: "General Help" },
                { id: "credentialing", label: "Credentialing" },
                { id: "caqh", label: "CAQH & NPI" },
                { id: "payerEnrollment", label: "Payer Panels" },
              ].map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id as any)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                    selectedTopic === topic.id
                      ? "border-[#043570] bg-[#043570]/5 text-[#043570] shadow-2xs font-bold"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Channels Grid */}
          <div className="space-y-3">
            {/* Channel 1: Bitrix24 Live Chat */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-[#00c0ff] hover:bg-[#00c0ff]/5 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#043570] transition-colors">
                      Live Chat Support
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      Fastest response
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Chat with our team right here in your browser via Bitrix24 live desk.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartLiveChat}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#043570] hover:bg-[#002855] text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-2xs"
              >
                <Sparkles className="size-3.5 text-[#00c0ff]" />
                <span>Start Live Chat</span>
              </button>
            </div>

            {/* Channel 2: Gmail Web Compose with Autofill */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-[#00c0ff] hover:bg-[#00c0ff]/5 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#043570] transition-colors">
                      Open in Gmail (Autofilled)
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      Pre-filled email
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Redirects to Gmail with recipient <strong className="text-slate-700 font-semibold">{SUPPORT_EMAIL}</strong>, subject, and template ready to send.
                  </p>
                </div>
              </div>

              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-2xs"
              >
                <span>Open Gmail</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>

            {/* Channel 3: Copy Email & Mailto */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Direct Email:</span>
                <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">
                  {SUPPORT_EMAIL}
                </code>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs inline-flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={mailtoUrl}
                  className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 text-[11px] underline underline-offset-2 transition-colors"
                >
                  Default app
                </a>
              </div>
            </div>

            {/* Channel 4: Urgent Hotline */}
            <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="size-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="size-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Urgent Compliance Hotline
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Expiring state licenses, payer committee cutoffs, or urgent audit notices.
                  </p>
                </div>
              </div>

              <a
                href={SUPPORT_PHONE_TEL}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-2xs"
              >
                <span>{SUPPORT_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Footer reassurance */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              <span>HIPAA Compliant &amp; Secure CVO Response Desk</span>
            </span>
            <span className="text-slate-400">Mon–Fri 8AM–8PM EST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportRequestModal;
