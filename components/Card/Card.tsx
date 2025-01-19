import React from "react";
import Button from "../ui/Button";

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
};
function Card({
  snippet_id,
  code = "",
  title = "No Title",
  name,
  you,
}: CardProps) {
  console.log(you);
  return (
    <div className="flex flex-col gap-3 sm:gap-5 p-5 bg-cardbackground rounded shadow-sm overflow-hidden">
      <div className="flex flex-col">
        <p className="text-[18px] text-primarycolor font-semibold">
          {title?.slice(0, 50)}
        </p>
        <p className="opacity-65 text-[10px]">
          {name || "unknown author"} {you ? "/ you " : ""}
        </p>
      </div>
      <pre className="overflow-hidden text-[12px] opacity-90 h-[100px]">
        <code className="line">{code}</code>
      </pre>
      <div>
        <Button destination={`/snippets/${snippet_id}`}>Read More</Button>
      </div>
    </div>
  );
}

export default Card;
