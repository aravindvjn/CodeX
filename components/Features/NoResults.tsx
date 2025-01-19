import React from "react";
import { AiOutlineFileUnknown } from "react-icons/ai";
function NoResults() {
  return (
    <div className="flex flex-col justify-center items-center pt-16 gap-3 md:gap-5 opacity-70">
      <AiOutlineFileUnknown className="h-[50px] md:h-[80px] w-[50px] md:w-[80px]" />
      <p>No Snippets are Found.</p>
    </div>
  );
}

export default NoResults;
