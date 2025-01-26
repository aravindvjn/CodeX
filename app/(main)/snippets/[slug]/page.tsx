"use server";
import AddSnippets from "@/components/Home/AddSnippets";
import Search from "@/components/Home/Search";
import { PageSearchParams } from "../../page";
import SnippetGrids from "@/components/Snippets/snippets-grid";
import { Suspense } from "react";
import CardLoading from "@/components/Card/CardLoading";

export default async function Page({
  searchParams = undefined,
  params,
}: PageSearchParams) {
  const { slug } = await params;
  const { search = "" } = (await searchParams) || {};

  return (
    <div>
      <Search input={search} />
      <AddSnippets slug={slug} />
      <Suspense fallback={<CardLoading/>}>
        <SnippetGrids slug={slug} search={search} />
      </Suspense>
    </div>
  );
}
