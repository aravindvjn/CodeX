"use server";
import React from "react";
import { CardProps } from "./Card";
import { CodeSnippet } from "./CodeSnippet";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import DeleteButton from "./DeleteButton";

function DetailedCard({ snippet_id, title, code, you, name }: CardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-center">
        <BackButton />
        <p className="text-[16px] text-primarycolor font-semibold">{title}</p>
      </div>
      <p className="text-right opacity-70">Author : {name || "Unknown"}</p>
      <CodeSnippet code={code || ""} />
      {you && (
        <div className="flex justify-between">
          <Button destination={`/snippets/${snippet_id}/edit`}>Edit</Button>
          <DeleteButton snippet_id={snippet_id || ""} />
        </div>
      )}
      <div>
        <p className="text-lg">Comments</p>
      </div>
    </div>
  );
}

export default DetailedCard;
