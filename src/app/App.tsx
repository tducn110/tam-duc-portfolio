import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PortfolioPage from "./routes/PortfolioPage";

// Lazy load the Admin/CRM page because standard visitors do not need to download CRM code
const AdminLeadsPage = lazy(() => import("./routes/AdminLeadsPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#090909] text-[#f7f9fa] flex items-center justify-center font-mono text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#af50ff] animate-ping mr-2"></span>
            Loading Secure Module...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/admin" element={<AdminLeadsPage />} />
          <Route path="/admin/leads" element={<AdminLeadsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
