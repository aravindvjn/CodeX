import React from "react";
import { CommentTypes, SetReplyType } from "./type";
import Loading from "../Features/Loading";
import Link from "next/link";
import { timeAgo } from "@/globals/functions/helper";

function ShowReplyComment({
  replies,
  setReply,
  comment_id,
}: {
  replies: CommentTypes[];
  setReply: SetReplyType;
  isLoading: boolean;
  comment_id: string | number;
}) {
  return (
    <div className="overflow-hidden pl-8 flex flex-col gap-2 mt-2">
      {replies?.length > 0 ? (
        replies.map((reply) => (
          <div key={reply.comment_id}>
            <div className="flex gap-2">
              <p className="font-bold text-[12px]">
                <Link href={`/author?identifier=${reply.user_id}`}>
                  {reply.username || "codex user"}
                </Link>
              </p>
              <p className="opacity-70 text-[10px] font-light text-right">
                {timeAgo(reply.timestamp)}
              </p>
            </div>
            <p>{reply.text}</p>
            <button className="opacity-50 text-[12px]"
              onClick={() => setReply({ comment_id, username: reply.username! })}
            >
              reply
            </button>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ShowReplyComment;
