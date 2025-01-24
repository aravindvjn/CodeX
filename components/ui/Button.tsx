"use client";
import { useRouter } from "next/navigation";
import React, { CSSProperties } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  isLoading?: boolean;
  style?: CSSProperties;
  destination?: string;
  onClick?: () => void;
}

function Button({
  destination,
  children,
  isLoading,
  onClick,
  style,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if (destination) {
      router.push(destination);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <motion.button
      whileTap={{
        backgroundColor: "var(--primarycolor)",
        scale: 0.95,
        rotate: "1.5deg",
      }}
      onClick={handleClick}
      style={style}
      className="px-3 py-2 font-semibold text-[16px] rounded border-primarycolor border text-white transition-opacity sm:hover:opacity-75 duration-100"
      disabled={isLoading}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
