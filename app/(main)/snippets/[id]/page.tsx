"use server";
import DetailedCard from "@/components/Card/DetailedCard";
import { getSnippetById } from "@/globals/functions/getSnippetById";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params }: any) {
  const { id } = await params;
  const snippet = await getSnippetById(id);
  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      <DetailedCard {...snippet!} />
    </div>
  );
}

export default page;
