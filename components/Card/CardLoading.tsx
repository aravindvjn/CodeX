import React from "react";
import Skeleton from "../Features/Skeleton";

function CardLoading() {
  return (
    <div className="gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="h-[300px]" />
        ))}
    </div>
  );
}

export default CardLoading;
