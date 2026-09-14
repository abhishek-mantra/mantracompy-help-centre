import { Link } from "react-router";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="size-14 rounded-2xl bg-blue-50 text-[#043570] flex items-center justify-center mx-auto border border-blue-100">
          <HelpCircle className="size-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Article Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The credentialing guide you are looking for may have been moved, renamed, or is currently being updated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#043570] hover:bg-[#032a57] text-white text-xs font-bold transition-all shadow-xs"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Help Center</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Browse Credentialing Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#043570] hover:border-[#043570]/30 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
