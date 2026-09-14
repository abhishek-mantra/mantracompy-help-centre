import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingSupportButton } from "./components/ui/FloatingSupportButton";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { ArticlePage } from "./pages/ArticlePage";
import { SearchPage } from "./pages/SearchPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-900 selection:bg-[#043570]/15 selection:text-[#043570]">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <FloatingSupportButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
