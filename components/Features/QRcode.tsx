"use client";
import { usePathname, useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";

function QRCodeComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`
      : "";
  return (
    <QRCode
      value={currentUrl}
      bgColor="var(--cardbackground)"
      fgColor="#ffffff"
      className="h-[100px] md:h-[200px] w-[100px] md:w-[200px]"
    />
  );
}

export default QRCodeComponent;
