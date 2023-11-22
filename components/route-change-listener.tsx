"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RouteChangeListener = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("route change too", pathname);
  }, [pathname]);
};

export default RouteChangeListener;
