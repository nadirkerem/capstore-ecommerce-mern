import { Outlet } from "react-router-dom";

import { Header } from "../components";

export default function HomePage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
