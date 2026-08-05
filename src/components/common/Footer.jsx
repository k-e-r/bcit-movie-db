import { Link } from "react-router";

const CATEGORY_LINKS = [
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
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-[1260px] px-4 sm:px-8 m-auto">
      <div className="flex justify-between flex-col sm:flex-row flex-col-reverse sm:flex-row">
        <div className="mt-13 sm:mt-0">
          <Link to="/" aria-label="Movie App home">
            <p className="uppercase text-2xl font-bold">Movie App</p>
          </Link>
        </div>

        <nav className="flex flex-col gap-2"
          aria-label="Footer navigation"
        >
          <Link className="uppercase font-bold" to="/">Home</Link>

          <ul className="flex flex-col gap-2 pl-3">
            {CATEGORY_LINKS.map(({ label, category }) => (
              <li key={category}>
                <Link
                  to={`/?category=${category}`}
                  className="
                    relative inline-block uppercase
                    after:absolute after:left-0 after:-bottom-0
                    after:h-px after:w-full after:bg-current
                    after:origin-left after:scale-x-0
                    after:transition-transform after:duration-300 after:ease-in-out
                    hover:after:scale-x-100
                  "
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link className="uppercase font-bold" to="/favourites">Favourites</Link>
          <Link className="uppercase font-bold" to="/about">About</Link>
        </nav>
      </div>

      <p className="text-center mt-10 mb-5 mx-2 text-xs sm:text-sm">&copy; {currentYear} Movie App. Sandy, Erimo, and Kaori</p>
    </footer>
  );
};