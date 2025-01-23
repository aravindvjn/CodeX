"use client";
import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { IoIosSend } from "react-icons/io";
import { addComment } from "@/globals/actions/addComment";
import { CommentTypes, ReplyType, SetReplyType } from "./type";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type CommentSectionProps = {
  snippet_id: string;
  setComments: Dispatch<SetStateAction<CommentTypes[]>>;
  reply: ReplyType;
  setReply: SetReplyType;
  fetchComments: (refetch: boolean) => void;
  setReplies: Dispatch<SetStateAction<CommentTypes[]>>;
};

function AddComments({
  snippet_id,
  setComments,
  reply,
  setReplies,
}: CommentSectionProps) {
  const [state, action, isPending] = useActionState(addComment, undefined);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (state && state.success && state.comment.text) {
      if (!state.comment.parent_comment_id) {
        setComments((prev) => [state.comment, ...prev]);
      } else {
        setReplies((prev) => [...prev, state.comment]);
      }
      setComment("");
    }
  }, [state]);

  useEffect(() => {
    if (reply?.comment_id) {
      setComment((prev) => "@" + reply?.username + " " + prev);
    }
  }, [reply]);

  return (
    <form
      action={action}
      className="fixed bottom-0 pb-4 sm:right-5 sm:w-1/2 flex gap-2 items-end w-full lg:w-1/3"
    >
      <input type="hidden" name="snippet_id" defaultValue={snippet_id} />
      <input
        type="hidden"
        name="parent_comment_id"
        defaultValue={reply?.comment_id}
      />
      <div className="flex justify-between w-full pr-6 gap-3 items-end">
        <div className="w-full">
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="px-3 flex flex-grow py-2 rounded text-black min-h-8 w-full"
            placeholder="Comment..."
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="rounded-full h-10 w-10 aspect-square justify-center items-center flex bg-blue-600 "
        >
         {isPending ? <AiOutlineLoading3Quarters size={18} className="animate-spin" /> :  <IoIosSend size={22} />}
        </button>
      </div>
    </form>
  );
}

export default AddComments;
