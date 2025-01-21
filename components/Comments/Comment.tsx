import { formatDate } from "@/globals/functions/helper";
import React from "react";
import { CommentTypes } from "./type";

function Comment({ name, text, timestamp }: CommentTypes) {
  return (
    <div className="rounded-lg rounded-tl-none bg-cardbackground px-4 py-2 w-fit gap-2">
      <p className="font-bold">{name}</p>
      <p className="font-light">{text}</p>
      <p className="opacity-70 text-[10px] text-right">
        {formatDate(timestamp)}
      </p>
    </div>
  );
}

export default Comment;
