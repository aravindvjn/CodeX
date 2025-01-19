"use client";
import React from "react";
import { languages } from "@/globals/functions/helper";
import { useRouter } from "next/navigation";

export type HomeHeaderProps = {
  setSelectedLanguage: (selectedLanguage: string) => void;
  selectedLanguage?: string;
  link?: boolean;
};

function LanguageOptions({
  setSelectedLanguage,
  selectedLanguage,
  link,
}: HomeHeaderProps) {
  const router = useRouter();

  // Change handler for language selection
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    //Navigation if the link is true
    if (link) {
      router.push(language ? `/snippets/${language}` : "/");
    }
  };

  return (
    <select
      value={selectedLanguage}
      onChange={changeHandler}
      name="language"
      className="rounded bg-cardbackground px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primarycolor"
    >
      <option value="">All</option>
      {languages?.map((language) => (
        <option key={language?.value} value={language?.value}>
          {language?.label}
        </option>
      ))}
    </select>
  );
}

export default LanguageOptions;
