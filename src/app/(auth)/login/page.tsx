"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Activity, Lock, Mail } from "lucide-react";
import { useLoginMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("Admin@123");
  const [email, setEmail] = useState("admin@dt.com");

  useEffect(() => {
    if (hydrated && token) {
      router.replace("/dashboard");
    }
  }, [hydrated, token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response.data));
      router.replace("/dashboard");
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrorMsg(
        apiErr?.data?.message || "Invalid credentials. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Doctor Tracker
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to access the clinical administration portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {errorMsg && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
              {errorMsg}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                id="email"
                type="email"
                value={email}
                placeholder="admin@dt.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
          <p className="font-semibold text-slate-800">
            Seeded Admin Credentials
          </p>
          <p className="mt-1">
            Email:{" "}
            <code className="font-mono text-sky-700">admin@dt.com</code>
          </p>
          <p>
            Password: <code className="font-mono text-sky-700">Admin@123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
