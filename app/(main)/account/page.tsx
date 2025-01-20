import AccountProfile from "@/components/Account/AccountProfile";
import { getAuthorData } from "@/globals/functions/getAuthorData";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  const { user: data } = session;

  const user = await getAuthorData(data?.id);
  return (
    <div>
      <AccountProfile user={user} data={data} />
    </div>
  );
}

export default page;
