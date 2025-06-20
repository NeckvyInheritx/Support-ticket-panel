"use client";

import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import { MEDUSA_BACKEND_URL } from "@/lib/medusa-client";
import React from "react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      {children}
    </MedusaProvider>
  );
}