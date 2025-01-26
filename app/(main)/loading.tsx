"use client";
import CardLoading from "@/components/Card/CardLoading";
import Skeleton from "@/components/Features/Skeleton";
import { usePathname } from "next/navigation";
import React from "react";

function Loading() {
  const pathName = usePathname();
  if (pathName === "/" || !pathName || pathName.startsWith("/snippets")) {
    return (
      <div className="flex flex-col gap-5 mt-2">
        <Skeleton className="w-full sm:w-1/2 md:w-1/3 h-8" />
        <div className="justify-between w-full flex">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
        <CardLoading />
      </div>
    );
  }
  return <Skeleton className="flex h-screen w-full" />;
}

export default Loading;
