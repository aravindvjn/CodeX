'use client';

import Button from "@/components/ui/Button";

export default function Error({reset }: { reset: () => void }) {
  return (
    <div className="flex justify-center items-center flex-col h-dvh gap-3">
      <h1>Something went wrong!</h1>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
