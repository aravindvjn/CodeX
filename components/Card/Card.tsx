import React from "react";
import Button from "../ui/Button";

export type CardProps = {
  code: string;
  title: string;
  snippet_id?: string;
  user_id?: string;
  name: string;
  email: string;
  you?: boolean;
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
        <p className="text-[18px] text-primarycolor font-semibold">{title}</p>
        <p className="opacity-65 text-[10px]">
          {name || "unknown author"} {you ? "/ you " : ""}
        </p>
      </div>
      <pre className="overflow-hidden text-[12px] opacity-90">
        <code>{code?.length > 300 ? code?.slice(0, 300) + "..." : code}</code>
      </pre>
      <Button destination={`/snippets/${snippet_id}`}>Visit</Button>
    </div>
  );
}

export default Card;
