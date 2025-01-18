"use client";
import React, { useActionState } from "react";
import Inputs from "../ui/Inputs";
import CodeEditor from "./CodeEditor";
import { createSnippetAction } from "@/globals/actions";
import Button from "../ui/Button";

function AddSnippet() {
  const [state, action] = useActionState(createSnippetAction, null);

  return (
    <form action={action} method="post" className="flex flex-col gap-5">
      <p className="text-lg font-semibold">Create Snippet</p>
      {state && <p className="text-red-600">{state?.message}</p>}
      <Inputs name="title" />
      <div>
        <label htmlFor="code">Source Code</label>
        <CodeEditor />
        <input type="hidden" name="code" id="code" />
      </div>
      <Button>Create Snippet</Button>
    </form>
  );
}

export default AddSnippet;
