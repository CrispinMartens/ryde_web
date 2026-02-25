"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

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
              Check your inbox
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              If you have an account with us, we&apos;ve sent a password reset
              link to{" "}
              <span className="text-zinc-200 font-medium">{email}</span>.
              It may take a few minutes to arrive.
            </p>
            <p className="text-xs text-zinc-500 mb-8">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setSubmitted(false)}
                className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
              >
                try again
              </button>
              .
            </p>
            <Link
              href="/investors"
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to sign in
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
            Forgot your password?
          </h2>
          <p className="text-sm text-zinc-400 mb-8">
            Enter the email address associated with your account and we&apos;ll
            send you a link to reset your password.
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
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pl-11 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/25"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 active:scale-[0.98]"
            >
              Send reset link
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
