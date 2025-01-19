"use client";
import React, { ChangeEvent, useState } from "react";
import Inputs from "../ui/Inputs";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
function Search({ input = "" }: { input: string }) {
  const [searchInput, setSearchInput] = useState<string>(input);
  const router = useRouter();

  //change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  //Navigation Handler
  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?search=${searchInput}`);
  };

  return (
    <form
      onSubmit={handleNavigate}
      className="pb-4 pt-2 relative sm:w-1/2 lg:w-1/3 sm:pr-1 md:pr-3"
    >
      <button type="submit" className="absolute top-[16px] left-2">
        <CiSearch size={20} />
      </button>
      <Inputs
        value={searchInput}
        style={{ paddingLeft: 35 }}
        onChange={handleChange}
        placeholder="Search Related Snippets..."
      />
    </form>
  );
}

export default Search;
