"use client";
import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import AddComments from "./AddComments";
import { CommentTypes, ReplyType } from "./type";
import { getComments } from "@/globals/api-calls/getComments";
import useOnScreen from "@/globals/hooks/useOnScreen";

function CommentFeature({ snippet_id }: { snippet_id: string }) {
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [reply, setReply] = useState<ReplyType>();
  const [replies, setReplies] = useState<CommentTypes[]>([]);
  const fetchComments = async (refetch?: boolean) => {
    setIsLoading(true);
    const limit = 5;
    if (refetch) {
      setComments([]);
      setIsFinished(false);
    }
    const page = refetch ? 1 : Math.floor(comments.length / limit + 1);
    const results = await getComments(snippet_id, page);
    if (results.length > 0) {
      setComments((prev) => {
        const combined = [...prev, ...results];
        const uniqueArray = combined.reduce((acc, current) => {
          const exists = acc.find(
            (item: CommentTypes) => item.comment_id === current.comment_id
          );
          if (!exists) {
            acc.push(current);
          }
          return acc;
        }, [] as CommentTypes[]);
        return uniqueArray;
      });
    } else {
      setIsFinished(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (isVisible && !isFinished && comments.length % 5 === 0) {
      fetchComments();
    }
  }, [isVisible]);

  return (
    <div>
      <CommentSection
        replies={replies}
        setReplies={setReplies}
        setReply={setReply}
        isLoading={isLoading}
        comments={comments}
      />
      <div ref={ref}></div>
      <AddComments
      setReplies={setReplies}
        fetchComments={fetchComments}
        reply={reply}
        setReply={setReply}
        setComments={setComments}
        snippet_id={snippet_id}
      />
    </div>
  );
}

export default CommentFeature;
