import Profile from "@/components/Author/Profile";
import { getAuthorData } from "@/globals/functions/getAuthorData";
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
  return (
    <div>
      <Profile {...data} />
    </div>
  );
}

export default page;
