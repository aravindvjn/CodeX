import React, { Dispatch, SetStateAction } from "react";
import Comment from "./Comment";
import { CommentTypes, SetReplyType } from "./type";
import Loading from "../Features/Loading";

function CommentSection({
  comments,
  isLoading,
  setReply,
  replies,
  setReplies,
}: {
  comments: CommentTypes[];
  isLoading: boolean;
  setReply: SetReplyType;
  replies: CommentTypes[];
  setReplies: Dispatch<SetStateAction<CommentTypes[]>>;
}) {
  return (
    <div className="pt-2 pb-10 flex flex-col gap-3">
      {comments?.map((comment) => (
        <Comment
          setReplies={setReplies}
          replies={replies}
          setReply={setReply}
          key={comment?.comment_id}
          {...comment}
        />
      ))}
      {isLoading && <Loading />}

      {!isLoading && comments?.length === 0 &&
        <p className="text-center opacity-70">No Comments are available.</p>}
    </div>
  );
}

export default CommentSection;
