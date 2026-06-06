import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PortfolioPage from "./routes/PortfolioPage";
import { appContent } from "./data/app";

// Lazy load secondary routes to ensure heavy dependencies like ThreeJS and Supabase are code-split
const AboutPage = lazy(() => import("./routes/AboutPage"));
const TemplatesPage = lazy(() => import("./routes/TemplatesPage"));
const SandboxPage = lazy(() => import("./routes/SandboxPage"));
const AdminLoginPage = lazy(() => import("./routes/AdminLoginPage"));
const AdminLeadsPage = lazy(() => import("./routes/AdminLeadsPage"));
const AdminGuard = lazy(() => import("./components/AdminGuard"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback = {
          <div className="min-h-screen bg-[#090909] text-[#f7f9fa] flex items-center justify-center font-mono text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#af50ff] animate-ping mr-2"></span>
            {appContent?.loadingSecureModule || "Loading..."}
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/labs" element={<SandboxPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminLeadsPage />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <AdminGuard>
                <AdminLeadsPage />
              </AdminGuard>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
