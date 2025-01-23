"use client";
import React from "react";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";

function WithProviders() {
  
  const signWithGoogle = () => {
    signIn("google", { callbackUrl: "/", redirect: true });
  };

  const signWithGithub = () => {
    signIn("github", { callbackUrl: "/", redirect: true });
  };
  
  return (
    <div className="flex justify-center items-center h-dvh flex-col gap-5">
      <div className="flex flex-col items-center">
        <p className="text-2xl ">CodeX Media</p>
        <p className="text-[10px]">A Social Nework for Developer</p>
      </div>
      <Button onClick={signWithGoogle}>Continue with Google</Button>
      <p className=" text-gray-500">OR</p>
      <Button onClick={signWithGithub}>Continue with Github</Button>
    </div>
  );
}

export default WithProviders;
