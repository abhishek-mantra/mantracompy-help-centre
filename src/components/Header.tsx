import { Search, ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-[#1976D2] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z" fill="#2196F3"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-tight tracking-tight">
              MantraComply
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              Help Center
            </span>
          </div>
        </Link>

        {/* Global Quick Search Button */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-500 transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search articles, NPI, CAQH, payers...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Link back to Platform */}
          <a
            href="http://localhost:5173/provider/credentialing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#2196F3] bg-blue-50 hover:bg-blue-100/80 border border-blue-200 rounded-lg transition-colors"
          >
            <span className="hidden sm:inline">Go to MantraComply Platform</span>
            <span className="sm:hidden">App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
