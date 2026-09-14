import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import { ARTICLE_REGISTRY } from "../../data/articleRegistry";
import { SearchDropdown } from "./SearchDropdown";

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  size?: "default" | "large";
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  initialQuery = "",
  placeholder = "Search guides, NPI, CAQH, or payer enrollment...",
  size = "default",
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredArticles = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return ARTICLE_REGISTRY.filter((article) => {
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchKeywords = article.searchKeywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchKeywords;
    });
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (selectedIndex >= 0 && filteredArticles[selectedIndex]) {
      navigate(`/articles/${filteredArticles[selectedIndex].slug}`);
      setIsOpen(false);
    } else {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredArticles.length === 0) {
      if (e.key === "ArrowDown" && query.trim()) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setSelectedIndex((prev) => (prev < filteredArticles.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredArticles.length - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const isLarge = size === "large";

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl mx-auto ${isOpen ? "z-50" : "z-20"} ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div
          className={`relative flex items-center bg-white rounded-full transition-all border ${
            isOpen
              ? "border-[#00c0ff] ring-4 ring-[#00c0ff]/15 shadow-md"
              : "border-slate-300 hover:border-slate-400 shadow-sm hover:shadow"
          } ${isLarge ? "h-14 pl-4.5 pr-2" : "h-11 pl-3.5 pr-1.5"}`}
        >
          <Search className="size-5 text-[#043570] shrink-0 ml-1" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => {
              if (query.trim()) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            placeholder={placeholder}
            className="w-full bg-transparent border-0 text-slate-900 placeholder:text-slate-400 focus:outline-hidden px-3 text-sm font-medium"
          />

          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear search"
              >
                <X className="size-4" />
              </button>
            )}

            <button
              type="submit"
              className={`rounded-full bg-[#00c0ff] hover:bg-[#00a8e0] text-white font-bold transition-all cursor-pointer shadow-xs hover:shadow-sm ${
                isLarge ? "px-6 py-2.5 text-xs sm:text-sm" : "px-4 py-1.5 text-xs"
              }`}
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Floating Suggestions Dropdown */}
      <SearchDropdown
        results={filteredArticles}
        query={query}
        selectedIndex={selectedIndex}
        isOpen={isOpen}
        onSelectResult={() => setIsOpen(false)}
        onViewAllResults={() => {
          navigate(`/search?q=${encodeURIComponent(query.trim())}`);
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default SearchBar;
