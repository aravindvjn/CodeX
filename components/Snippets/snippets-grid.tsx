import { getAllSnippets } from "@/globals/functions/getAllSnippets";
import React from "react";
import Card from "../Card/Card";
import NoResults from "../Features/NoResults";

export type SnippetGridsType = {
  slug: string;
  search: string;
};
async function SnippetGrids({ search, slug }: SnippetGridsType) {
  const data = await getAllSnippets({
    slug,
    search: search || "",
  });

  return (
    <div>
      <div className=" gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 &&
          data?.map((item, index) => <Card key={index} {...item} />)}
      </div>
      {data?.length === 0 && <NoResults />}
    </div>
  );
}

export default SnippetGrids;
