import { Link } from "react-router";
import { HelpCircle, ArrowLeft, Home, Compass } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="w-16 h-16 bg-blue-50 text-[#2196F3] rounded-2xl flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The article or topic you are looking for might have moved, or the link may be outdated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2196F3] text-white text-xs font-semibold hover:bg-[#1976D2] transition-colors shadow-2xs"
          >
            <Home className="w-4 h-4" />
            <span>Go to Help Center Home</span>
          </Link>
          <Link
            to="/category/getting-started-npi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Getting Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
