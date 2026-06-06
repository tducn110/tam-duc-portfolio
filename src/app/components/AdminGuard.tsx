import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { supabase } from "@/shared/lib/supabase";
import { appContent } from "../data/app";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setIsAuthenticated(!!session);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (mounted) {
        setIsAuthenticated(!!session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-[#f7f9fa] flex items-center justify-center font-mono text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#af50ff] animate-ping mr-2"></span>
        {appContent?.loadingSecureModule || "Checking authentication..."}
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, storing the attempted URL in navigation state
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
