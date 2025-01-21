"use client";
import React, { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { addComment } from "@/globals/actions/addComment";
import { CommentTypes } from "./type";

export type CommentSectionProps = {
  snippet_id: string;
  setComments: Dispatch<SetStateAction<CommentTypes[]>>;
};

function AddComments({ snippet_id,setComments }: CommentSectionProps) {
  const [state, action, isPending] = useActionState(addComment, undefined);

  useEffect(()=>{
    if(state && state.success && state.comment.text){
      
    }
  },[state])
  return (
    <form
      action={action}
      className="fixed bottom-0 pb-4 sm:right-5 sm:w-1/2 flex gap-2 items-end w-full lg:w-1/3"
    >
      <input type="hidden" name="snippet_id" defaultValue={snippet_id} />
      <input type="hidden" name="parentCommentId" defaultValue={"postid"} />
      <div className="flex justify-between w-full pr-5 gap-3 items-end">
        <textarea
          name="comment"
          className="px-3 flex flex-grow py-2 rounded text-black min-h-8"
          placeholder="Comment..."
        />
        <button
          type="submit"
          className="rounded-full h-10 w-10 justify-center items-center flex bg-blue-600 "
        >
          <IoIosSend size={22} />
        </button>
      </div>
    </form>
  );
}

export default AddComments;
