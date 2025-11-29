// app/components/ToastProvider.tsx
"use client"; // <-- IMPORTANTE: esto marca el componente como client

import { useToastProvider } from "@/hooks/use-toast";
import React from "react";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return useToastProvider({ children });
}
