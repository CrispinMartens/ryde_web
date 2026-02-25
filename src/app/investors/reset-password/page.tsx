"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              RYDE
            </h1>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Password reset
            </h2>
            <p className="text-sm text-zinc-400 mb-8">
              Your password has been successfully updated. You can now sign in
              with your new password.
            </p>
            <Link
              href="/investors"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 active:scale-[0.98]"
            >
              Sign in
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            RYDE
          </h1>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-1">
            Reset your password
          </h2>
          <p className="text-sm text-zinc-400 mb-8">
            Choose a new password for your account.
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Enter new password"
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
              <p className="mt-1.5 text-xs text-zinc-500">
                Must be at least 8 characters with a number and symbol.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/25"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 active:scale-[0.98]"
            >
              Reset password
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/investors"
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to sign in
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} RYDE. All rights reserved.
        </p>
      </div>
    </main>
  );
}
