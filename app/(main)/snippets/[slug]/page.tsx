"use server";
import Card from "@/components/Card/Card";
import AddSnippets from "@/components/Home/AddSnippets";
import Search from "@/components/Home/Search";
import { getAllSnippets } from "@/globals/functions/getAllSnippets";
import { PageSearchParams } from "../../page";

export default async function Page({
  searchParams = undefined,
  params,
}: PageSearchParams) {
  const { slug } = await params;
  const { search = "" } = (await searchParams) || {};

  const data = await getAllSnippets({
    slug,
    search: search || "",
  });
  return (
    <div>
      <Search input={search} />
      <AddSnippets slug={slug} />
      <div className=" gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data?.map((item, index) => <Card key={index} {...item} />)
        ) : (
          <p className="text-center pt-5">No Snippets are Found.</p>
        )}
      </div>
    </div>
  );
}
