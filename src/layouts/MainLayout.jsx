import { Outlet } from "react-router";

import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { ScrollToTop } from "../components/common/ScrollToTop";

function MainLayout() {
  return (
    <>
      <Header/>

      <main>
        <ScrollToTop />
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;