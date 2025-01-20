import React from "react";
import { LuSquareActivity } from "react-icons/lu";

function NoActivities() {
  return (
    <div className="flex flex-col items-center h-[250px] justify-center gap-3 text-gray-400">
      <LuSquareActivity size={50} />
      <p>No Activities.</p>
    </div>
  );
}

export default NoActivities;
