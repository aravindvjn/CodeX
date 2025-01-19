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
};
function Card({
  snippet_id,
  code = "",
  title = "No Title",
  name,
  you,
  language,
  user_id,
}: CardProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 p-5 bg-cardbackground rounded shadow-sm overflow-hidden">
      <div className="flex flex-col">
        <p className="text-[18px] text-primarycolor font-semibold">
          {title?.slice(0, 50)}
        </p>
        <div className="flex opacity-65 text-[10px]">
          <p>{extractLangauge(language || "")}</p>
          {name && language && "/"}
          <Link href={`/author?identifier=${user_id}`}>
            {name || "unknown author"}
          </Link>{" "}
          <p>{you ? "/ you " : ""}</p>
        </div>
      </div>
      <pre className="overflow-hidden text-[12px] opacity-90 max-h-[100px]">
        <code className="line">{code}</code>
      </pre>
      <div>
        <Button destination={`/snippet/${snippet_id}`}>Read More</Button>
      </div>
    </div>
  );
}

export default Card;
