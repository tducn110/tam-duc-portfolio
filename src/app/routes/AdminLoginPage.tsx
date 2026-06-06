import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { supabase } from "@/shared/lib/supabase";
import { Button, Card, Input, FormItem, Typography } from "@/shared/ui";
import { fonts } from "@/shared/lib/tokens";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if session already exists
  useEffect(() => {
    async function checkExistingSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/admin", { replace: true });
      }
    }
    checkExistingSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      // Login success, redirect to destination saved in state or default to /admin
      const from = (location.state as any)?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-foreground flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#6c4bd6]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#af50ff]/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#6b6b6b] hover:text-[#af50ff] uppercase transition-colors mb-6"
          style={{ fontFamily: fonts.mono, letterSpacing: "0.15em" }}
        >
          <ArrowLeft size={14} /> Back to site
        </a>

        <Card variant="frost" className="p-8 border border-white/[0.08] backdrop-blur-md">
          <div className="text-center mb-8">
            <Typography as="h2" variant="subheading" className="text-2xl font-bold tracking-tight mb-2">
              Admin Login
            </Typography>
            <Typography variant="body" color="ghost" className="text-xs opacity-60">
              Access the secure leads management dashboard
            </Typography>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <FormItem label="Email Address">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b6b6b]">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                  required
                />
              </div>
            </FormItem>

            <FormItem label="Password">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b6b6b]">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                  required
                />
              </div>
            </FormItem>

            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
