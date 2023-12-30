"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const QueryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default QueryWrapper;
