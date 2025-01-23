import React from "react";
import NoActivities from "../Features/NoActivities";
import Card, { CardProps } from "../Card/Card";
import { User } from "../Account/AccountProfile";
function Activities({ snippets, user }: { snippets: CardProps[]; user: User }) {
  
  return (
    <div className="mt-5">
      <p className="text-lg font-semibold">Activities : </p>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
        {snippets?.map((snippet) => (
          <Card
            key={snippet.id}
            snippet_id={snippet.id}
            {...snippet}
            {...user}
          />
        ))}
      </div>
      {snippets?.length === 0 && <NoActivities />}
    </div>
  );
}

export default Activities;
