import React from "react";
import Comment from "./Comment";
import { CommentTypes, SetReplyType } from "./type";
import Loading from "../Features/Loading";

function CommentSection({
  comments,
  isLoading,
  setReply,
}: {
  comments: CommentTypes[];
  isLoading: boolean;
  setReply: SetReplyType;
}) {
  return (
    <div className="pt-2 pb-10 flex flex-col gap-3">
      {comments?.map((comment) => (
        <Comment setReply={setReply} key={comment?.comment_id} {...comment} />
      ))}
      {isLoading && (
        <Loading/>
      )}
    </div>
  );
}

export default CommentSection;
