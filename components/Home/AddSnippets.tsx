import React from "react";
import Button from "../ui/Button";

function AddSnippets() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">Your Code Snippets</p>

      <Button destination="add-snippets">Add Snippet</Button>
    </div>
  );
}

export default AddSnippets;
