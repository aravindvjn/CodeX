'use client';

import Header from "@/components/Header/Header";
import Layout, { LayoutProp } from "@/components/ui/Layout";
import React, { useRef, useEffect } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { usePathname } from "next/navigation";

function LayoutComponent({ children }: LayoutProp) {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    loadingBarRef.current?.continuousStart();

    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div>
      <LoadingBar ref={loadingBarRef} color="var(--primarycolor)" height={3} />

      <Header />

      <Layout>{children}</Layout>
    </div>
  );
}

export default LayoutComponent;
