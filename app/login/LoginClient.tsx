"use client";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push(redirectTo);
      }
    });
  }, [router, redirectTo]);

  // Rate limiting - unlock after 15 minutes
  useEffect(() => {
    if (isLocked && lockoutTime) {
      const timer = setTimeout(() => {
        setIsLocked(false);
        setLoginAttempts(0);
        setLockoutTime(null);
        setError("");
      }, 15 * 60 * 1000); // 15 minutes

      return () => clearTimeout(timer);
    }
  }, [isLocked, lockoutTime]);

  function handleFailedAttempt() {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= 5) {
      setIsLocked(true);
      setLockoutTime(Date.now());
      setError("Too many failed attempts. Account locked for 15 minutes.");
    }
  }

  async function handlePasswordLogin() {
    if (isLocked) {
      setError("Account is locked. Please try again in 15 minutes.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("🔐 Attempting login with:", email);

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Login timeout - please check your connection')), 10000)
      );

      const loginPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data, error: loginError } = await Promise.race([
        loginPromise,
        timeoutPromise
      ]) as any;

      console.log("📊 Login response:", { data, error: loginError });

      if (loginError) {
        console.error("❌ Login error:", loginError);
        handleFailedAttempt();
        setError(loginError.message);
        setLoading(false);
        return;
      }

      // Check if user has admin/editor role
      if (data.user) {
        console.log("👤 User logged in:", data.user.id);
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        console.log("📋 Profile data:", { profile, error: profileError });

        if (profileError) {
          console.error("❌ Profile fetch error:", profileError);
          setError("Error fetching user profile. Please try again.");
          setLoading(false);
          return;
        }

        if (!profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
          console.warn("⛔ Access denied - invalid role:", profile?.role);
          await supabase.auth.signOut();
          setError("Access denied. You don't have permission to access the admin area.");
          setLoading(false);
          return;
        }

        console.log("✅ Login successful! Role:", profile.role);
      }

      // Success - reset attempts
      setLoginAttempts(0);
      console.log("🚀 Redirecting to:", redirectTo);
      router.push(redirectTo);
    } catch (err: any) {
      console.error("💥 Unexpected error:", err);
      setError(err.message || "An unexpected error occurred. Please check your connection.");
      setLoading(false);
    }
  }

  async function handleMagicLink() {
    if (isLocked) {
      setError("Account is locked. Please try again in 15 minutes.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: magicError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${redirectTo}`,
      },
    });

    if (magicError) {
      setError(magicError.message);
      setLoading(false);
      return;
    }

    alert("✉️ Check your email for the magic link!");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🌱
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EcoGarden CMS</h1>
          <p className="text-gray-600 mt-2">Sign in to manage content</p>
        </div>

        {/* Security Warning if locked */}
        {isLocked && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-red-600 text-xl">🔒</span>
              <div>
                <div className="font-medium text-red-900">Account Locked</div>
                <div className="text-sm text-red-700 mt-1">
                  Too many failed login attempts. Please try again in 15 minutes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Attempts Warning */}
        {loginAttempts > 0 && loginAttempts < 5 && !isLocked && (
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <span>⚠️</span>
              <span>Failed attempts: {loginAttempts}/5. {5 - loginAttempts} remaining.</span>
            </div>
          </div>
        )}

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("password")}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              mode === "password"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🔑 Password
          </button>
          <button
            onClick={() => setMode("magic")}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              mode === "magic"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            ✨ Magic Link
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="admin@ecogarden.is"
          />
        </div>

        {/* Password Input (only for password mode) */}
        {mode === "password" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={mode === "password" ? handlePasswordLogin : handleMagicLink}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 transition-all"
        >
          {loading
            ? "Loading..."
            : mode === "password"
            ? "Sign In"
            : "Send Magic Link"}
        </button>

        {/* Info Text */}
        {mode === "magic" && (
          <p className="mt-4 text-sm text-gray-600 text-center">
            We'll send you a secure login link via email
          </p>
        )}

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
