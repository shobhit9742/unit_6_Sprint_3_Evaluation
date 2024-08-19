import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
