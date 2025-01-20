import React from "react";
import NoActivities from "../Features/NoActivities";
import Card, { CardProps } from "../Card/Card";
function Activities({ snippets }: { snippets: CardProps[] }) {
  return (
    <div className="mt-5">
      <p className="text-lg font-semibold">Activities : </p>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
        {snippets?.map((snippet) => (
          <Card key={snippet.snippet_id} {...snippet} />
        ))}
      </div>
      {snippets?.length === 0 && <NoActivities />}
    </div>
  );
}

export default Activities;
