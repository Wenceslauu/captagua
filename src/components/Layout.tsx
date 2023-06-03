import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 p-8">{children}</main>
      <Footer />
    </>
  );
}
