"use server";
import React from "react";
import { AuthorDataProps } from "./type";
import QRCodeComponent from "../Features/QRcode";
import { formatDate } from "@/globals/functions/helper";
import BackButton from "../ui/BackButton";
function Profile({ created_at, name, username }: AuthorDataProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <BackButton /> <p className="font-bold text-lg">{username}</p>
      </div>
      <div className="flex gap-3 items-end mt-4">
        <QRCodeComponent />
        <div className="flex flex-col">
          <h2 className="text-[18px] font-bold text-primarycolor ">{name}</h2>
          <p>@{username || "codex user"}</p>
          <p className="text-gray-400">Joined on {formatDate(created_at)}</p>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Profile;
