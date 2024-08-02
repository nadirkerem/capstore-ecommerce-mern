import { FaBars, FaCartShopping, FaShop } from "react-icons/fa6";
import { IoSunny, IoMoon } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../utils/links";
import { useEffect, useState } from "react";
import { themes } from "../utils/themes";

function initTheme() {
  return localStorage.getItem("theme") || themes.pastel;
}

export default function Navbar() {
  const [theme, setTheme] = useState<string>(initTheme());

  function toggleTheme() {
    const { pastel, sunset } = themes;
    const newTheme = theme === pastel ? sunset : pastel;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="bg-base-200">
      <div className="navbar mx-auto max-w-6xl px-8">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden items-center text-5xl transition hover:scale-110 lg:flex"
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
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={toggleTheme}
              className="swap-checkbox"
            />
            <IoSunny className="swap-on h-6 w-6" />
            <IoMoon className="swap-off h-6 w-6" />
          </label>
          <NavLink to="/cart" className="btn btn-circle btn-ghost btn-md ml-4">
            <div className="indicator">
              <FaCartShopping className="h-6 w-6" />
              <span className="badge indicator-item badge-neutral badge-sm">
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
