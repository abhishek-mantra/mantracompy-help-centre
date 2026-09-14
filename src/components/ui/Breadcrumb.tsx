import React from "react";
import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#043570] transition-colors font-medium"
      >
        <Home className="size-3.5 text-slate-400" />
        <span>Help Center</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="size-3.5 text-slate-300 shrink-0" />
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-[#043570] transition-colors font-medium truncate max-w-[200px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-semibold truncate max-w-[280px]">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
