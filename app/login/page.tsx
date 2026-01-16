"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const router = useRouter();

  async function handlePasswordLogin() {
    setLoading(true);
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  async function handleMagicLink() {
    setLoading(true);
    setError("");

    const { error: magicError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
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
