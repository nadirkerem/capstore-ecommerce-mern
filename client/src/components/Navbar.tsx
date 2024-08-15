/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { FaBars, FaCartShopping, FaShop } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { guestLinks, navbarLinks, userLinks } from "../utils/links";

import { ThemeController } from ".";

import { logoutUser, toggleTheme } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const { params } = useLoaderData() as { params: any };
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const numberOfItems = useAppSelector((state) => state.cart.numberOfItems);
  const navigate = useNavigate();

  function handleThemeToggle() {
    dispatch(toggleTheme());
  }

  function handleLogout() {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/");
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
        <div className="navbar-end gap-x-2">
          <ThemeController handleThemeToggle={handleThemeToggle} />
          <NavLink to="/cart" className="btn btn-circle btn-ghost btn-md">
            <div className="indicator">
              <FaCartShopping className="h-6 w-6" />
              <span className="badge indicator-item badge-neutral badge-sm">
                {numberOfItems}
              </span>
            </div>
          </NavLink>
          {/*  */}
          <div className="flex items-center justify-center gap-x-2">
            {user ? (
              <div className="flex items-center gap-x-2">
                <p className="text-xs font-medium sm:text-sm">
                  Hello,{" "}
                  {user.user.username.length > 10
                    ? user.user.username.slice(0, 10) + "..."
                    : user.user.username}
                </p>
                {userLinks.map((link) => {
                  const { id, name, path } = link;
                  return (
                    <Link
                      key={id}
                      to={path}
                      className="btn btn-neutral btn-xs sm:btn-sm"
                    >
                      {name}
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="btn btn-neutral btn-xs sm:btn-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              guestLinks.map((link) => {
                const { id, name, path } = link;
                return (
                  <Link
                    key={id}
                    to={path}
                    className="btn btn-neutral btn-xs sm:btn-sm"
                  >
                    {name}
                  </Link>
                );
              })
            )}
          </div>

          {/*  */}
        </div>
      </div>
    </nav>
  );
}
