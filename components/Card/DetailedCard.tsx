'use server'
import React from "react";
import { CardProps } from "./Card";
import { CodeSnippet } from "./CodeSnippet";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";

function DetailedCard({ title, code, id }: CardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-start">
        <BackButton />
        <p className="text-[16px] text-primarycolor font-semibold">{title}</p>
      </div>
      <CodeSnippet code={code} />
      <div className="flex justify-between">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}

export default DetailedCard;
