import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Navbar</h1>
      <Outlet />
    </>
  );
}
