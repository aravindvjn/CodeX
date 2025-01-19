"use client";
import React, { useActionState } from "react";
import Inputs from "../ui/Inputs";
import CodeEditor from "./CodeEditor";
import { snippetAction } from "@/globals/actions";
import Button from "../ui/Button";
import { CardProps } from "../Card/Card";
import { PageType, prevActionStateType } from "./type";

function AddSnippet({ code, snippet_id, title }: CardProps) {
  //finding the page type
  let page: PageType = "Create Snippet";
  if (snippet_id) {
    page = "Edit Snippet";
  }

  const initialState: prevActionStateType = {
    page,
    snippet_id,
    message: "",
  };

  const [state, action, isPending] = useActionState(
    snippetAction,
    initialState
  );

  return (
    <form action={action} method="post" className="flex flex-col gap-5">
      <p className="text-lg font-semibold">{page}</p>
      {state && <p className="text-red-600">{state?.message}</p>}
      <Inputs defaultValue={title} name="title" />
      <div>
        <label htmlFor="code">Source Code</label>
        <CodeEditor initialCode={code || ""} />
        <input defaultValue={code} type="hidden" name="code" id="code" />
      </div>
      <Button disabled={isPending} type="submit">
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

export default AddSnippet;
