"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Activity, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (hydrated && token) {
      router.replace("/dashboard");
    }
  }, [hydrated, token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const response = await register({
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();
      dispatch(setCredentials(response.data));
      router.replace("/dashboard");
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrorMsg(
        apiErr?.data?.message || "Registration failed. Please try again.",
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
            Create Account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Register to access the Doctor Tracker clinical portal
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
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                id="name"
                type="text"
                value={name}
                minLength={2}
                maxLength={80}
                placeholder="Dr. John Doe"
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

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
                placeholder="coordinator@clinic.com"
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
                minLength={6}
                value={password}
                placeholder="At least 6 characters"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                minLength={6}
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Re-enter your password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-sky-600 transition hover:text-sky-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
