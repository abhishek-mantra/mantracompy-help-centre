import { Link } from "react-router";
import { Category } from "../types/helpCenter";
import {
  Compass,
  ShieldCheck,
  Award,
  Building2,
  FileCheck2,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  ShieldCheck,
  Award,
  Building2,
  FileCheck2,
};

interface CategoryCardProps {
  category: Category;
  articleCount?: number;
}

export function CategoryCard({ category, articleCount }: CategoryCardProps) {
  const Icon = ICON_MAP[category.iconName] || BookOpen;
  const count = articleCount ?? category.articleCount ?? 0;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative bg-white border border-slate-200 hover:border-[#2196F3] rounded-2xl p-6 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Icon Header */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2196F3] group-hover:bg-[#2196F3] group-hover:text-white transition-colors">
            <Icon className="w-6 h-6 transition-transform group-hover:scale-105" />
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200">
            {count} {count === 1 ? "article" : "articles"}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2196F3] transition-colors leading-snug">
            {category.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2196F3]">
        <span>Explore category</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default CategoryCard;
