"use server";
import DetailedCard from "@/components/Card/DetailedCard";
import AddComments from "@/components/Comments/AddComments";
import CommentFeature from "@/components/Comments/CommentFeature";
import CommentSection from "@/components/Comments/CommentSection";
import { getComments } from "@/globals/functions/getComments";
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
  const prevComments = await getComments(snippet?.snippet_id);
  return (
    <div>
      <DetailedCard {...snippet} />
      <CommentFeature
        prevComments={prevComments}
        snippet_id={snippet.snippet_id}
      />
    </div>
  );
}

export default page;
