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
              className={({ isActive }) =>
                `relative uppercase font-semibold text-white
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                after:origin-left after:bg-white after:transition-transform after:duration-300
                ${
                  isActive
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
