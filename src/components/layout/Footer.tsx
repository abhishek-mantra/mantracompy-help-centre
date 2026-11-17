import React from "react";
import { Link } from "react-router";
import { Mail, Phone, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0b172a] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo-white.png"
                alt="MantraComply"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                  e.currentTarget.className = "h-8 w-auto object-contain brightness-0 invert";
                }}
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering healthcare organizations and individual providers to automate credentialing, licensing, and payer enrollment with AI-driven compliance and 95% first-time approval.
            </p>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@mantracomply.com&su=[General%20Inquiry]%20MantraComply%20Support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  title="Opens Gmail compose pre-addressed to contact@mantracomply.com"
                >
                  <Mail className="size-3.5 text-cyan-400 shrink-0" />
                  <span>contact@mantracomply.com</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const w = window as any;
                    if (w.BX?.LiveChat?.openLiveChat) w.BX.LiveChat.openLiveChat();
                    else if (w.b24SiteButton?.open) w.b24SiteButton.open();
                    else {
                      const el = document.querySelector('.b24-widget-button-openline_livechat, .b24-widget-button-wrapper, .b24-widget-button') as HTMLElement | null;
                      if (el) el.click();
                    }
                  }}
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span>Bitrix24 Live Chat</span>
                </button>
              </li>
              <li>
                <a
                  href="tel:+13323318626"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="size-3.5 text-cyan-400 shrink-0" />
                  <span>+1 (332) 331-8626</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Solutions */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="https://mantracomply.com/credentialing/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Healthcare Credentialing</a></li>
              <li><a href="https://mantracomply.com/licensing/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Provider Licensing</a></li>
              <li><a href="https://mantracomply.com/payer-enrollment/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Payer Enrollment</a></li>
              <li><a href="https://mantracomply.com/pricing/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pricing &amp; Plans</a></li>
            </ul>
          </div>

          {/* Col 4: Who We Help */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Who We Help
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Individual Practitioners</li>
              <li>Medical Groups &amp; Clinics</li>
              <li>Payers &amp; Health Plans</li>
              <li>Behavioral Health Practices</li>
              <li>Telehealth Networks</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <span>© 2026 MantraComply, LLC. All rights reserved.</span>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://mantracomply.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://mantracomply.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Contact Us
            </a>
            <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
              <ShieldCheck className="size-3.5" />
              <span>HIPAA Compliant</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
