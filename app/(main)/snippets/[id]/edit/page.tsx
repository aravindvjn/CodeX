"use server";
import React from "react";
import { SnippetPropType } from "../page";

import { getUserId } from "@/lib/session";
import { notFound } from "next/navigation";
import { getSnippetById } from "@/globals/functions/getSnippetById";
import AddSnippet from "@/components/AddSnippet/AddSnippet";

async function Page({ params }: SnippetPropType) {
  const { id } = await params;

  const snippet = await getSnippetById(id);
  const userId = await getUserId();

  if (!snippet) {
    notFound();
  }

  const { user_id: author_id } = snippet;
  if (author_id !== userId) {
    notFound();
  }

  return (
    <div>
      <AddSnippet {...snippet} />
    </div>
  );
}

export default Page;
