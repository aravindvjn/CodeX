import React from "react";
import Comment from "./Comment";
import { CommentTypes } from "./type";

function CommentSection({ comments }: { comments: CommentTypes[] }) {
  return (
    <div className="pt-2 pb-10 flex flex-col gap-3">
      {comments?.map((comment) => (
        <Comment key={comment?.comment_id} {...comment} />
      ))}
    </div>
  );
}

export default CommentSection;
