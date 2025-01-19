import Image from "next/image";
import React from "react";

export type User = {
  user: {
    name: string;
    image: string;
    email: string;
  };
};
function AccountProfile({ user }: User) {
  return (
    <div className="pt-6 flex flex-col items-center gap-2">
      <Image
        width={400}
        height={400}
        className="h-1/2 max-h-[100px] max-w-[100px] aspect-square rounded-full"
        src={user?.image || ""}
        alt={`Profile of ${user?.name}`}
      />
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-center">{user?.name}</h1>
        <p className="text-sm text-center text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
}

export default AccountProfile;
