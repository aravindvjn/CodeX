"use server";
import React from "react";
import { CardProps } from "./Card";
import { CodeSnippet } from "./CodeSnippet";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import DeleteButton from "./DeleteButton";
import { extractLangauge } from "@/globals/functions/helper";
import Link from "next/link";

function DetailedCard({
  snippet_id,
  title,
  code,
  you,
  username,
  language,
  user_id,
}: CardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-center">
        <BackButton />
        <p className="text-[16px] text-primarycolor font-semibold">{title}</p>
      </div>
      <div className="flex opacity-70 text-[10px] justify-between">
        <p>{extractLangauge(language || "")}</p>

        <Link href={`/author?identifier=${user_id}`}>
          {" "}
          <p className="">Author : @{username || "codex user"}</p>
        </Link>
      </div>
      <CodeSnippet code={code || ""} />
      {you && (
        <div className="flex justify-between sm:justify-normal gap-5">
          <Button destination={`/snippet/${snippet_id}/edit`}>Edit</Button>
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
