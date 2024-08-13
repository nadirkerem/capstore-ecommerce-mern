import { Link } from "react-router-dom";

import { Navbar } from ".";

import { guestLinks } from "../utils/links";

export default function Header() {
  return (
    <header className="bg-neutral text-neutral-content">
      <div className="mx-auto flex max-w-6xl justify-center px-8 py-2 md:justify-end">
        <div className="flex items-center justify-center gap-x-6">
          {guestLinks.map((link) => {
            const { id, name, path } = link;
            return (
              <Link
                key={id}
                to={path}
                className="link-hover link text-xs sm:text-sm"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
      <Navbar />
    </header>
  );
}
