"use server";
import DetailedCard from "@/components/Card/DetailedCard";
import CommentSection from "@/components/Comments/CommentSection";
import { getSnippetById } from "@/globals/functions/getSnippetById";
import { notFound } from "next/navigation";
import React from "react";

export type SnippetPropType = {
  params: Promise<{
    id: string;
  }>;
};

async function page({ params }: SnippetPropType) {
  const { id } = await params;
  const snippet = await getSnippetById(id);
  if (!snippet) {
    notFound();
  }
  return (
    <div>
      <DetailedCard {...snippet} />
      <CommentSection/>
    </div>
  );
}

export default page;
