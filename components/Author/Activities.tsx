import React from "react";
import { LuSquareActivity } from "react-icons/lu";
function Activities() {
  return (
    <div className="mt-5">
      <p className="text-lg font-semibold">Activities : </p>
      <div className="flex flex-col items-center h-[250px] justify-center gap-3 text-gray-400">
        <LuSquareActivity size={50} />
        <p>No Activities.</p>
      </div>
    </div>
  );
}

export default Activities;
