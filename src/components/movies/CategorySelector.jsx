import { useEffect, useState } from "react"
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { Link, useSearchParams } from "react-router";

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

export const CategorySelector = () => {
  const [searchParams] = useSearchParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState(CATEGORY_LINKS[0].label);

  useEffect(() => {
    const category = searchParams.get('category') ?? CATEGORY_LINKS[0].category;

    setSelectCategory(CATEGORY_LINKS.find((item) => item.category === category).label ?? CATEGORY_LINKS[0].label);
  }, [searchParams.get('category')])

  return (
    <>
      <div className="relative flex justify-center my-12">
        <button
          className="inline-flex sm:hidden items-center justify-center border rounded-full px-4 py-2.5 cursor-pointer"
          type="button"
          onClick={() => setIsCategoryOpen((prev) => !prev)}
        >
          <p className="w-[150px] uppercase">{selectCategory}</p>
          <ChevronUpIcon className={`${isCategoryOpen ? "" : "rotate-180"} transition-all duration-300 ease-in-out w-[20px] h-auto`} aria-hidden="true" />
        </button>

        <div
          className={`${isCategoryOpen ? "absolute" : "hidden"} top-13 z-10 w-51 sm:w-full bg-white sm:block`}
        >
          <ul className="pt-1 uppercase block sm:flex sm:justify-around" aria-labelledby="dropdownDefaultButton">
            {CATEGORY_LINKS.map(({ label, category }) => (
              <li key={category} className="inline-flex items-center justify-center w-full cursor-pointer sm:w-35 md:w-51">
                <Link
                  className={`${selectCategory === label ? "bg-black text-white" : ""} block uppercase font-bold w-full py-2 pr-5 text-center hover:bg-black hover:text-white sm:border sm:rounded-full sm:px-4 sm:py-2.5 sm:whitespace-nowrap transition-all duration-300 ease-in-out`}
                  to={`/?category=${category}`}
                  onClick={() => setIsCategoryOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${isCategoryOpen ? "block" : "hidden"} fixed top-0 left-0 w-screen h-screen z-1`}
          onClick={() => setIsCategoryOpen(false)}
        ></div>
      </div>
    </>
  )
}
