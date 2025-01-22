import React, {useState } from "react";
import { CommentTypes } from "./type";
import { timeAgo } from "@/globals/functions/helper";
import ShowReplyComment from "./ShowReplyComment";
import { getReplies } from "@/globals/api-calls/getReplies";
import Link from "next/link";

function Comment({
  comment_id,
  name,
  text,
  timestamp,
  setReply,
  replies_count,
  parent_comment_id,
  user_id,
}: CommentTypes) {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replies, setReplies] = useState<CommentTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReplyComments = async () => {
    if (showReply) {
      setShowReply(false);
      return;
    }

    setShowReply(true);
    setIsLoading(true);

    const results = await getReplies(comment_id);

    if (results.length > 0) {
      setReplies(results);
    }
    setIsLoading(false);
  };
  
  return (
    <div
      className={` rounded-lg rounded-tl-none bg-cardbackground px-4 py-2  gap-1 flex flex-col items-start w-fit ${
        parent_comment_id ? "pr-0" : ""
      }`}
    >
      <div className="flex gap-2">
        <p className="font-bold">
          <Link href={`/author?identifier=${user_id}`}>
            {name || "Unknown"}
          </Link>
        </p>
        <p className="opacity-70 text-[10px] font-light text-right">
          {timeAgo(timestamp)}
        </p>
      </div>
      <p className="font-light">{text}</p>
      <div className="flex justify-between gap-10 text-[12px] opacity-50">
        <button
          onClick={() =>
            setReply!({
              name,
              comment_id,
            })
          }
        >
          reply
        </button>
        {parseInt(replies_count || "0") !== 0 && (
          <button onClick={fetchReplyComments}>
            {showReply ? "Hide replies" : "Show replies"}
          </button>
        )}
      </div>
      {showReply && (
        <ShowReplyComment
          isLoading={isLoading}
          setReply={setReply!}
          replies={replies}
        />
      )}
    </div>
  );
}

export default Comment;
