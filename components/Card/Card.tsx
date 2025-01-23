import React from "react";
import Button from "../ui/Button";
import { extractLangauge } from "@/globals/functions/helper";
import Link from "next/link";

export type CardProps = {
  code?: string;
  title?: string;
  snippet_id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  you?: boolean;
  created_at?: string;
  updated_at?: string;
  language?: string;
  id?: string;
  username?: string;
};
function Card({
  snippet_id,
  code = "",
  title = "No Title",
  you,
  language,
  user_id,
  username,
}: CardProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 p-5 bg-cardbackground rounded shadow-sm overflow-hidden justify-between">
      <div className="flex flex-col">
        <p className="text-[18px] text-primarycolor font-semibold">
          {title?.slice(0, 50)}
        </p>
        <div className="flex opacity-65 text-[10px] pb-1">
          <p>{extractLangauge(language || "")}</p>
          {language && "/"}
          <Link href={`/author?identifier=${user_id}`}>
            @{username || "codex user"}
          </Link>{" "}
          <p>{you ? "/ you " : ""}</p>
        </div>
        <pre className="overflow-hidden text-[12px] opacity-90 text-wrap break-words line-clamp-5">
          <code>{code}</code>
        </pre>
      </div>
      <div>
        <Button destination={`/snippet/${snippet_id}`}>Read More</Button>
      </div>
    </div>
  );
}

export default Card;
