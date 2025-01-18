import Header from "@/components/Header/Header";
import Layout, { LayoutProp } from "@/components/ui/Layout";
import React from "react";

function layout({ children }: LayoutProp) {
  return (
    <div>
      <Header />
      <Layout>{children}</Layout>
    </div>
  );
}

export default layout;
