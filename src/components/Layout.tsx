import { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="flex-1 p-8">{children}</main>
      <Footer />
    </>
  );
}
