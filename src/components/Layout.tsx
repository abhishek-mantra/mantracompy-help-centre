import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchModal from "./SearchModal";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-[#2196F3]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <div className="flex-1">
        {children}
      </div>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}

export default Layout;
