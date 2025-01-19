"use client";
import React, { useEffect } from "react";
import { useActionState } from "react";
import Button from "../ui/Button";
import { deleteSnippet } from "@/globals/actions";
import toast from "react-hot-toast";

export type DeleteActionType = {
  snippet_id: string;
  message: string;
};

function DeleteButton({ snippet_id }: { snippet_id: string }) {
  const initialState = { message: "", snippet_id };

  const [state, action, isPending] = useActionState(deleteSnippet, initialState);
  
  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state?.message,isPending]);

  return (
    <form action={action}>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}

export default DeleteButton;
