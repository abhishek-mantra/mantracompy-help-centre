import { Link } from "react-router";
import { CATEGORIES } from "../data/categories";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#2196F3] rounded flex items-center justify-center text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="white"/>
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-sm">MantraComply</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Official healthcare credentialing, CAQH ProView compliance, and health plan enrollment support.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              © {new Date().getFullYear()} Mantra Health Technologies Inc. All rights reserved.
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-slate-600 hover:text-[#2196F3] transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Platform Links
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a
                  href="http://localhost:5173/provider/credentialing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2196F3] transition-colors"
                >
                  Provider Credentialing Wizard
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:5173/provider/referrals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2196F3] transition-colors"
                >
                  Refer &amp; Boost Program
                </a>
              </li>
              <li>
                <a
                  href="https://mantracomply.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2196F3] transition-colors"
                >
                  MantraComply Homepage
                </a>
              </li>
              <li>
                <a
                  href="https://proview.caqh.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2196F3] transition-colors"
                >
                  CAQH ProView Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Need Direct Support?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have questions about your file status or a pending health plan audit?
            </p>
            <div className="pt-1">
              <a
                href="mailto:credentialing@mantracomply.com"
                className="inline-block text-xs font-medium text-[#2196F3] hover:text-[#1976D2] underline"
              >
                credentialing@mantracomply.com
              </a>
            </div>
            <div className="text-[11px] text-slate-400">
              Average response time: &lt; 2 business hours
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
