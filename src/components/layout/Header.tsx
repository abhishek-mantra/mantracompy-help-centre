import React, { useState } from "react";
import { Link } from "react-router";
import { Sparkles, MessageSquare } from "lucide-react";
import { SupportRequestModal } from "../support/SupportRequestModal";

export function Header() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Clean Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="MantraComply"
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-102"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-xs font-semibold text-slate-500 border-l border-slate-200 pl-3 hidden sm:inline">
                Help Center
              </span>
            </Link>

            {/* Clean Right Actions */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold">
              <Link
                to="/tour"
                className="text-[#008cb8] hover:text-[#043570] transition-colors hidden sm:inline-flex items-center gap-1.5 font-bold"
              >
                <Sparkles className="size-3.5" />
                <span>Interactive Tour</span>
              </Link>

              {/* Submit a Request (Opens Interactive Support Modal: Live Chat or Pre-filled Gmail) */}
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="text-slate-600 hover:text-[#043570] transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium hover:bg-slate-50 px-2.5 py-1.5 rounded-lg"
              >
                <MessageSquare className="size-3.5 text-[#00c0ff]" />
                <span>Submit a Request</span>
              </button>

              <a
                href="https://app.mantracomply.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border-2 border-[#043570] text-[#043570] hover:bg-[#043570] hover:text-white font-bold text-xs sm:text-sm transition-all"
              >
                <span>Sign In</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Support Modal */}
      <SupportRequestModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </>
  );
}

export default Header;
