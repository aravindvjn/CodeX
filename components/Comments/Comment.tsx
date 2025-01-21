import { formatDate } from "@/globals/functions/helper";
import React from "react";

function Comment({ comment, author, createdAt, replies }: any) {
  return (
    <div className="rounded-lg rounded-tl-none bg-cardbackground px-4 py-2 w-fit gap-2">
      <p className="font-bold">{author}</p>
      <p className="font-light">{comment}</p>
      <p className="opacity-70 text-[10px] text-right">
        {formatDate(createdAt)}
      </p>
    </div>
  );
}

export default Comment;
