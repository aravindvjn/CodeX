import React from "react";
import Button from "../ui/Button";

export type CardProps = {
  code: string;
  title: string;
  id?: string | number;
};
function Card({ id, code = "", title = "No Title" }: CardProps) {
  return (
    <div className="flex flex-col gap-5 p-5 bg-cardbackground rounded shadow-sm overflow-hidden">
      <p className="text-[18px]">{title}</p>
      <pre className="overflow-hidden">
        <code>{code?.length > 200 ? code?.slice(0, 200) + "..." : code}</code>
      </pre>
      <Button destination={`/snippets/${id}`}>Visit</Button>
    </div>
  );
}

export default Card;
