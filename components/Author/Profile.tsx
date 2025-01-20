'use server'
import React from "react";
import { AuthorDataProps } from "./type";
import QRCodeComponent from "../Features/QRcode";
import { formatDate } from "@/globals/functions/helper";
function Profile({ created_at, name }: AuthorDataProps) {
  return (
    <div className="flex gap-3 items-end mt-4">
      <QRCodeComponent />
      <div className="flex flex-col">
        <h2 className="text-[18px] font-bold text-primarycolor ">{name}</h2>
        <p className="text-gray-400">Joined on {formatDate(created_at)}</p>
      </div>
      <hr />
    </div>
  );
}

export default Profile;
