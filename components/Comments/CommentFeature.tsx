"use client";
import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import AddComments from "./AddComments";
import { CommentTypes } from "./type";

function CommentFeature({
  snippet_id,
  prevComments,
}: {
  snippet_id: string;
  prevComments: CommentTypes[];
}) {
  const [comments, setComments] = useState<CommentTypes[]>(prevComments);

  return (
    <div>
      <CommentSection comments={comments} />
      <AddComments setComments={setComments} snippet_id={snippet_id} />
    </div>
  );
}

export default CommentFeature;
