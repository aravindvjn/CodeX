"use server";
import Card from "@/components/Card/Card";
import AddSnippets from "@/components/Home/AddSnippets";
import { getAllSnippets } from "@/globals/functions/getAllSnippets";

export default async function Home() {
  const data = await getAllSnippets();

  return (
    <div>
      <AddSnippets />
      <div className=" gap-3 md:gap-5 mt-5 grid sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => {
          console.log(item);
          return <Card key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
