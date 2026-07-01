"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function ConditionalPreFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return <>{children}</>;
}
