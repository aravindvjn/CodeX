"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import LanguageOptions from "../AddSnippet/SelectLanguage";

function AddSnippets({ slug }: { slug?: string }) {
  const [language, setLanguage] = useState<string>(slug || "");
  return (
    <div className="flex items-center justify-between">
      <LanguageOptions
        selectedLanguage={language}
        link
        setSelectedLanguage={setLanguage}
      />
      <Button destination="/add-snippets">Add Snippet</Button>
    </div>
  );
}

export default AddSnippets;
