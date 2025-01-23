import Activities from "@/components/Author/Activities";
import Profile from "@/components/Author/Profile";
import { getAuthorData } from "@/globals/functions/getAuthorData";
import { getSnippetsByUserId } from "@/globals/functions/getSnipppetsByUserId";
import { notFound } from "next/navigation";
import React from "react";
export type AuthorProps = {
  searchParams: Promise<{
    identifier: string;
  }>;
};

async function page({ searchParams }: AuthorProps) {
  const { identifier } = await searchParams;
  const data = await getAuthorData(identifier);

  if (!data) {
    notFound();
  }

  const snippets = await getSnippetsByUserId(identifier);
  
  return (
    <div>
      <Profile {...data} />
      <Activities user={data} snippets={snippets} />
    </div>
  );
}

export default page;
