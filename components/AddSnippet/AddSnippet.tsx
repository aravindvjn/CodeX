"use client";
import React, { useActionState, useState } from "react";
import Inputs from "../ui/Inputs";
import CodeEditor from "./CodeEditor";
import { snippetAction } from "@/globals/actions";
import Button from "../ui/Button";
import { CardProps } from "../Card/Card";
import { PageType, prevActionStateType } from "./type";
import LanguageOptions from "./SelectLanguage";
import BackButton from "../ui/BackButton";
import Link from "next/link";

function AddSnippet({ code, snippet_id, title, language }: CardProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    language || ""
  );
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
      <div className="flex items-center gap-2">
        <BackButton />
        <p className="text-lg font-semibold">{page}</p>
      </div>

      {state?.message && (
        <p className="text-red-600">
          {state?.message}{" "}
          {state?.message === "You must need to set a username" && (
            <Link className="text-blue-500 underline-offset-3 underline" href={"/account"}>
              set username
            </Link>
          )}
        </p>
      )}

      <LanguageOptions
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Inputs defaultValue={title} name="title" />

      <div>
        <label htmlFor="code">Source Code</label>
        <CodeEditor
          language={selectedLanguage || ""}
          initialCode={code || ""}
        />
        <input defaultValue={code} type="hidden" name="code" id="code" />
      </div>

      <Button disabled={isPending} type="submit">
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

export default AddSnippet;
