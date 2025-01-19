import React from "react";

export type LayoutProp = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProp) {
  return <div className="px-3 sm:px-7 md:px-12 pt-14 pb-12 text-sm lg:px-20">{children}</div>;
}

export default Layout;
