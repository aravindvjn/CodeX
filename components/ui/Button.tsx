"use client";
import { useRouter } from "next/navigation";
import React, { CSSProperties, HTMLAttributes } from "react";
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  style?: CSSProperties;
  destination?: string;
  params?: any;
  onClick?: () => void;
}

function Button({
  destination,
  params,
  children,
  isLoading,
  onClick,
  style,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if (destination) {
      router.push(destination, params);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
      style={style}
      className="px-3 py-2 font-semibold text-[16px] rounded border-primarycolor border text-white transition-opacity sm:hover:opacity-75 duration-100"
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
