import AccountProfile from "@/components/Account/AccountProfile";
import Activities from "@/components/Author/Activities";
import { getAuthorData } from "@/globals/functions/getAuthorData";
import { getSnippetsByUserId } from "@/globals/functions/getSnipppetsByUserId";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    notFound();
  }

  const { user: data } = session;
  const user = await getAuthorData(data?.id);
  const snippets = await getSnippetsByUserId(user.id);

  return (
    <div>
      <AccountProfile user={user} data={data} />
      <Activities user={user} snippets={snippets} />
    </div>
  );
}

export default page;
