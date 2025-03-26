"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RouteChangeListener = () => {
  const pathname = usePathname();
  useEffect(() => {
  }, [pathname]);
};

export default RouteChangeListener;
