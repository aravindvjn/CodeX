import React from "react";
import { CommentTypes, SetReplyType } from "./type";
import Comment from "./Comment";
import Loading from "../Features/Loading";

function ShowReplyComment({
  replies,
  setReply,
}: {
  replies: CommentTypes[];
  setReply: SetReplyType;
  isLoading: boolean;
}) {
  return (
    <div className=" overflow-hidden">
      {replies?.length > 0 ? (
        replies.map((reply) => (
          <Comment setReply={setReply} key={reply.comment_id} {...reply} />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ShowReplyComment;
