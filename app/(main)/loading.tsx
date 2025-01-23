"use client";
import Skeleton from "@/components/Features/Skeleton";
import { usePathname } from "next/navigation";
import React from "react";

function Loading() {
  const pathName = usePathname();
  if (pathName === "/" || !pathName) {
    return (
      <div className="flex flex-col gap-5 mt-2">
        <Skeleton className="w-full sm:w-1/2 md:w-1/3 h-8" />
        <div className="justify-between w-full flex">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
        <div className="gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-[300px]" />
            ))}
        </div>
      </div>
    );
  }
  return <Skeleton className="flex h-screen w-full"/>;
}

export default Loading;
