import React, { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";
import { TocItem } from "../../types/helpCenter";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (!items || items.length === 0) return;

    setActiveId(items[0]?.id || "");

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If close to bottom of document, highlight the last item
      if (scrollPosition + windowHeight >= documentHeight - 60) {
        setActiveId(items[items.length - 1].id);
        return;
      }

      // If at the very top of the page, highlight the first item
      if (scrollPosition < 120) {
        setActiveId(items[0].id);
        return;
      }

      // Find the heading the user has scrolled to or past (offset threshold = 140px)
      const headerOffset = 140;
      let currentActiveId = items[0].id;

      for (let i = 0; i < items.length; i++) {
        const element = document.getElementById(items[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            currentActiveId = items[i].id;
          } else {
            // Headings appear in chronological order; stop at first heading below threshold
            break;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    // Run initial check after DOM paint
    const timer = setTimeout(handleScroll, 120);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
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
                    const yOffset = -90;
                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                    history.pushState(null, "", `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={`group flex items-start gap-1.5 py-1.5 px-2.5 rounded-lg transition-all ${
                  isActive
                    ? "font-bold text-[#043570] bg-blue-100/70 border-l-2 border-[#043570]"
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
