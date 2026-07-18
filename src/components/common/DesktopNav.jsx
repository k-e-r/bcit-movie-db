import { NavLink } from "react-router";

const NAV_ITEMS = [
  {
    label: "Favourites",
    path: "/favourites",
  },
  {
    label: "About",
    path: "/about",
  },
]

export const DesktopNav = () => {
  return (
    <nav className="hidden sm:block" aria-label="Main navigation">
      <ul className="flex gap-20">
        {NAV_ITEMS.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => `uppercase nav-link${isActive ? " active" : ""} font-semibold text-white hover:text-gray-400 transition-colors duration-300 ease-in-out`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
