import { FaBars, FaCartShopping, FaShop } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../utils/links";

export default function Navbar() {
  return (
    <nav className="bg-base-200">
      <div className="navbar mx-auto max-w-6xl px-8">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="btn btn-primary hidden items-center text-3xl lg:flex"
          >
            <FaShop />
          </NavLink>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBars className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-10 mt-3 w-52 rounded-box bg-base-200 p-2 shadow"
            >
              {navbarLinks.map((link) => {
                const { id, name, path } = link;
                return (
                  <li key={id}>
                    <NavLink to={path} className="capitalize">
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {navbarLinks.map((link) => {
              const { id, name, path } = link;
              return (
                <li key={id}>
                  <NavLink to={path} className="capitalize">
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-auto"
            />
          </div>
        </div>
        <div className="navbar-end">
          {/* Theme Toggle */}
          <NavLink to="/cart" className="btn btn-circle btn-ghost btn-md ml-4">
            <div className="indicator">
              <FaCartShopping className="h-6 w-6" />
              <span className="badge indicator-item badge-primary badge-sm">
                0
              </span>
            </div>
          </NavLink>
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost ml-4"
          >
            <div className="w-10 rounded-full">
              <img
                alt="profile avatar"
                src="https://100k-faces.glitch.me/random-image"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
