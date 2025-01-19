"use server";
import Card from "@/components/Card/Card";
import AddSnippets from "@/components/Home/AddSnippets";
import Search from "@/components/Home/Search";
import Inputs from "@/components/ui/Inputs";
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
// export const revalidate = 0
export default async function Home({
  searchParams = undefined,
}: PageSearchParams) {

  const { search='' } = (await searchParams) || {};

  const data = await getAllSnippets({
    slug: "",
    search: search,
  });
  return (
    <div>
      <Search input={search} />
      <AddSnippets />
      <div className=" gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
