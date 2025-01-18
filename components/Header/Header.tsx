import Link from "next/link";
import React from "react";
import { FaCode } from "react-icons/fa";
function Header() {
  return (
    <div className="px-3 sm:px-5 py-2 md:px-7 justify-between flex fixed w-screen text-white bg-cardbackground items-center text-primarycolor">
      <div
        className="
      flex items-center gap-3"
      >
        <FaCode />
        <p className="text-xl sm:text-2xl font-semibold">CodeX</p>
      </div>
      <ul className="flex gap-4 sm:gap-7 md:gap-12 text-[12px] sm:text-[14px] items-center">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Search</Link>
        </li>
        <li>
          <Link href={"/"}>Account</Link>
        </li>
        <li>
          <Link href={"/"}>About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
