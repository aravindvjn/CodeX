"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center flex-col h-dvh gap-3">
      <h1>Something went wrong!</h1>
      <Button onClick={() => router.refresh}>Try Again</Button>
    </div>
  );
}
