import React, { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";
import { TocItem } from "../../types/helpCenter";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="space-y-3 p-4 bg-white border border-slate-200/90 rounded-2xl text-xs shadow-2xs"
    >
      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-500 text-[11px] pb-2 border-b border-slate-200/80">
        <List className="size-3.5 text-[#043570]" />
        <span>On this page</span>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.pushState(null, "", `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={`group flex items-start gap-1.5 py-1 px-2 rounded-lg transition-all ${
                  isActive
                    ? "font-bold text-[#043570] bg-blue-100/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <ChevronRight
                  className={`size-3 mt-0.5 shrink-0 transition-transform ${
                    isActive
                      ? "text-[#00c0ff] translate-x-0.5"
                      : "text-slate-300 group-hover:text-slate-400"
                  }`}
                />
                <span className="leading-snug">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
