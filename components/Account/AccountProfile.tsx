import Image from "next/image";
import React from "react";
import { AuthorDataProps } from "../Author/type";
import EditName from "./EditName";
export type User = {
  user: AuthorDataProps;
  data: {
    image: string;
    email: string;
  };
};
function AccountProfile({ user, data }: User) {
  return (
    <div className="pt-6 flex flex-col items-center gap-2">
      <Image
        width={400}
        height={400}
        className="h-1/2 max-h-[100px] max-w-[100px] aspect-square rounded-full"
        src={data?.image || ""}
        alt={`Profile of ${user?.name}`}
      />
      <div className="flex flex-col items-center">
        <EditName name={user?.name} />
        <p className="text-sm text-center text-gray-600">{user?.email}</p>
        <p>{user?.bio}</p>
      </div>
    </div>
  );
}

export default AccountProfile;
