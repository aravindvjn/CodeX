"use client";
import React from "react";
import NextNProgress from "nextjs-progressbar";

function ProgressBar() {
  return (
    <NextNProgress
    color="#ff6347"
    startPosition={0.5}
    stopDelayMs={300}
    height={4}
  />
  );
}

export default ProgressBar;
