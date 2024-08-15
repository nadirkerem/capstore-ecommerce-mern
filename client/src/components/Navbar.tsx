/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { FaBars, FaCartShopping, FaShop } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { navbarLinks } from "../utils/links";

import { ThemeController } from ".";
import { toggleTheme } from "../features/user/userSlice";

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const { params } = useLoaderData() as { params: any };
  const dispatch = useAppDispatch();
  const numberOfItems = useAppSelector((state) => state.cart.numberOfItems);

  function handleThemeToggle() {
    dispatch(toggleTheme());
  }

  return (
    <nav className="bg-base-200">
      <div className="navbar mx-auto max-w-7xl">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden items-center text-5xl transition hover:scale-105 lg:flex"
          >
            <FaShop />
            <span className="text-md ml-2">
              <strong>Cap</strong>
              <span>Store</span>
            </span>
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
          <form>
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={params.search}
              />
              <Link to={`/products?search=${search}`}>
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </label>
          </form>
        </div>
        <div className="navbar-end">
          <ThemeController handleThemeToggle={handleThemeToggle} />
          <NavLink to="/cart" className="btn btn-circle btn-ghost btn-md">
            <div className="indicator">
              <FaCartShopping className="h-6 w-6" />
              <span className="badge indicator-item badge-neutral badge-sm">
                {numberOfItems}
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
