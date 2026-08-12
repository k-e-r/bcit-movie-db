import { Link, NavLink } from "react-router";

import { LogoIcon } from "../icons/LogoIcon";

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    submenu: [
      { label: "Now Playing", category: "now_playing" },
      { label: "Upcoming", category: "upcoming" },
      { label: "Top Rated", category: "top_rated" },
      { label: "Popular", category: "popular" },
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

export const MobileNav = ({ isMenuOpen, closeMenu }) => {
  return (
    <nav
      id="main-navigation"
      className={`
        fixed left-0 top-0 z-50 h-svh w-4/5
        bg-white p-5 px-4 sm:hidden
        transition-transform duration-300 ease-in-out
        ${
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full pointer-events-none"
        }
      `}
      aria-label="Main navigation"
      aria-hidden={!isMenuOpen}
    >
      <div className="mb-10">
        <Link
          to="/"
          aria-label="Movie App home"
          onClick={closeMenu}
        >
          <LogoIcon className="h-auto w-[30px]" />
        </Link>
      </div>

      <ul className="flex flex-col gap-5">
        {NAV_ITEMS.map(({ label, path, submenu }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === "/"}
              onClick={closeMenu}
              className="uppercase text-2xl font-bold"
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
                      className="
                        relative inline-block uppercase text-2xl
                        after:absolute after:left-0 after:-bottom-1
                        after:h-0.5 after:w-full after:bg-current
                        after:origin-left after:scale-x-0
                        after:transition-transform after:duration-300
                        after:ease-in-out hover:after:scale-x-100
                      "
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