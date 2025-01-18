"use client";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <button className="border-primarycolor border flex justify-center items-center h-8 w-8 rounded-full" onClick={() => router.back()}>
      <IoIosArrowBack />
    </button>
  );
}

export default BackButton;
