import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header, Footer } from "./components";
import Home from "./Home";
import {
  AboutPage,
  ArticlePage,
  ChangelogPage,
  ContactPage,
  DemoPage,
  DocsPage,
  FeatureDetailPage,
  FeaturesPage,
  LegalPage,
  NotFound,
  PricingPage,
  ResourcesPage,
  SolutionDetailPage,
  SolutionsPage,
} from "./Pages";
import { features, solutions, guides } from "./content";

function PageContext() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/": "Great work is in the details.",
      "/features": "Features for the little things",
      "/solutions": "A workflow for every team",
      "/pricing": "Simple pricing for every team size",
      "/about": "Why the little things matter",
      "/contact": "Let’s get into the details",
      "/demo": "Try the interactive demo",
      "/resources": "Guides & insights",
      "/docs": "Help center",
      "/changelog": "Product notes",
      "/privacy": "Privacy for this preview",
      "/terms": "Terms for this preview",
    };
    const detail = pathname.startsWith("/features/")
      ? features.find((item) => pathname.endsWith(`/${item.slug}`))
      : pathname.startsWith("/solutions/")
        ? solutions.find((item) => pathname.endsWith(`/${item.slug}`))
        : pathname.startsWith("/resources/")
          ? guides.find((item) => pathname.endsWith(`/${item.slug}`))
          : null;
    document.title = `${pageTitles[pathname] || detail?.title || "Page not found"} — Jira Checklist`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        detail?.description ||
          "Structured, accountable execution inside every Jira issue. Organize checklists, track progress, and make every detail count — without the sub-task clutter.",
      );
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="top" />
      <PageContext />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/features/:slug" element={<FeatureDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ArticlePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
