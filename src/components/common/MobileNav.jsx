import { Link, NavLink } from "react-router";

import { LogoIcon } from "../icons/LogoIcon";

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    submenu: [
      {
        label: "Now Playing",
        category: "now_playing",
      },
      {
        label: "Upcoming",
        category: "upcoming",
      },
      {
        label: "Top Rated",
        category: "top_rated",
      },
      {
        label: "Popular",
        category: "popular",
      },
    ],
  },
  {
    label: "Favourites",
    path: "/favourites",
  },
  {
    label: "About",
    path: "/about",
  },
];

export const MobileNav = ({
  isMenuOpen,
  closeMenu,
}) => {
  return (
    <nav
      id="main-navigation"
      className={`fixed left-0 top-0 z-50 h-svh w-4/5 bg-white p-5 px-4 sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
      aria-label="Main navigation"
    >
      <div className="mb-10">
        <Link to="/" aria-label="Movie App home">
          <LogoIcon className="w-[30px] h-auto hover:opacity-60 transition-all duration-300 ease-in-out" />
        </Link>
      </div>

      <ul className="flex flex-col gap-5">
        {NAV_ITEMS.map(({ label, path, submenu }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === "/"}
              onClick={closeMenu}
              className={({ isActive }) => `uppercase text-2xl font-bold transition-colors duration-300 ease-in-out hover:text-gray-400 ${isActive ? "text-gray-400" : ""}`}
            >
              {label}
            </NavLink>

            {submenu && (
              <ul className="mt-2 flex flex-col gap-2 pl-3">
                {submenu.map(({ label, category }) => (
                  <li key={category}>
                    <Link
                      to={`/?category=${category}`}
                      onClick={closeMenu}
                      className="uppercase text-2xl transition-colors duration-300 ease-in-out hover:text-gray-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};