"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            RYDE
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to your account
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/25"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="/login/forgot-password" className="text-zinc-400 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#e20000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c00] active:scale-[0.98]"
            >
              Sign in
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} RYDE. All rights reserved.
        </p>
      </div>
    </main>
  );
}
