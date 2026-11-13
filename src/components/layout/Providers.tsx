"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { hydrateAuth } from "@/store/slices/authSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
