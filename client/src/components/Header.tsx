import { Link, useNavigate } from "react-router-dom";

import { Navbar } from ".";

export default function Header() {
  return (
    <header className="bg-neutral text-neutral-content">
      <div className="mx-auto flex max-w-6xl justify-center px-8 py-2 md:justify-end">
        <div className="flex items-center justify-center gap-x-6"></div>
      </div>
      <Navbar />
    </header>
  );
}
