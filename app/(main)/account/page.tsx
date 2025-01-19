import AccountProfile from "@/components/Account/AccountProfile";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  const { user } = session;
  return (
    <div>
      <AccountProfile user={user} />
    </div>
  );
}

export default page;
