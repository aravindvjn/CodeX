import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="flex  opacity-60 gap-2 items-center">
      <AiOutlineLoading3Quarters className="animate-spin" size="15" />
      Loading...
    </div>
  );
}

export default Loading;
