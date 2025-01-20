"use server";
import Card from "@/components/Card/Card";
import NoResults from "@/components/Features/NoResults";
import AddSnippets from "@/components/Home/AddSnippets";
import Search from "@/components/Home/Search";
import { getAllSnippets } from "@/globals/functions/getAllSnippets";

export type PageSearchParams = {
  searchParams:
    | Promise<{
        search: string;
      }>
    | undefined;
  params: Promise<{
    slug: string;
  }>;
};
export default async function Home({
  searchParams = undefined,
}: PageSearchParams) {
  const { search = "" } = (await searchParams) || {};

  const data = await getAllSnippets({
    slug: "",
    search: search,
  });
  return (
    <div>
      <Search input={search} />
      <AddSnippets />
      <div className=" gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 &&
          data?.map((item, index) => <Card key={index} {...item} />)}
      </div>
      {data?.length === 0 && <NoResults />}
    </div>
  );
}
