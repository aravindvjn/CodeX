"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";

function WithProviders() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const signWithGoogle = async () => {
    setLoading(true);
    const res = await signIn("google", { callbackUrl: "/" });
    if (res?.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  const signWithGithub = async () => {
    setLoading(true);
    const res = await signIn("github", { callbackUrl: "/" });
    if (res?.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-dvh flex-col gap-5">
      <div className="flex flex-col items-center">
        <p className="text-2xl">CodeX Media</p>
        <p className="text-[10px]">A Social Network for Developers</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={signWithGoogle} disabled={loading}>
        {loading ? "Signing in with Google..." : "Continue with Google"}
      </Button>
      <p className="text-gray-500">OR</p>
      <Button onClick={signWithGithub} disabled={loading}>
        {loading ? "Signing in with GitHub..." : "Continue with GitHub"}
      </Button>
    </div>
  );
}

export default WithProviders;
