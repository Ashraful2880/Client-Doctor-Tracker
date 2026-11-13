"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, hydrated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <LoadingSkeleton variant="stat-grid" />
          <LoadingSkeleton variant="table" rows={6} columns={5} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
