import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import { getCategoryMovies } from "../services/movieService";
import { HeroSection } from "../components/movies/HeroSection";
import { HeroSkeleton } from "../components/movies/HeroSkelton";
import { MovieListSection } from "../components/movies/MovieListSection";

const DEFAULT_CATEGORY = "popular";

const VALID_CATEGORIES = [
  "popular",
  "top_rated",
  "now_playing",
  "upcoming",
];

const MOVIES_PER_PAGE = 12;
const TMDB_MOVIES_PER_PAGE = 20;
const TMDB_MAX_PAGE = 500;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movieList, setMovieList] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const movieListRef = useRef(null);

  const queryCategory = searchParams.get("category");

  const category = VALID_CATEGORIES.includes(queryCategory)
    ? queryCategory
    : DEFAULT_CATEGORY;

  const queryPage = Number(searchParams.get("page"));

  const currentPage =
    Number.isInteger(queryPage) && queryPage > 0
      ? queryPage
      : 1;

  useEffect(() => {
    const updateHeroMovies = async () => {
      try {
        const data = await getCategoryMovies(category, 1);

        setHeroMovies(
          (data.results ?? []).slice(0, 3)
        );
      } catch (error) {
        console.error("Failed to fetch hero movies:", error);
        setHeroMovies([]);
      }
    };

    updateHeroMovies();
  }, [category]);

  useEffect(() => {
    const updateMovieList = async () => {
      setIsLoading(true);

      try {
        const startIndex =
          (currentPage - 1) * MOVIES_PER_PAGE;

        const endIndex =
          startIndex + MOVIES_PER_PAGE - 1;

        const firstTmdbPage =
          Math.floor(startIndex / TMDB_MOVIES_PER_PAGE) + 1;

        const lastTmdbPage =
          Math.floor(endIndex / TMDB_MOVIES_PER_PAGE) + 1;

        if (firstTmdbPage > TMDB_MAX_PAGE) {
          setMovieList([]);
          setHeroMovies([]);
          return;
        }

        const firstData = await getCategoryMovies(
          category,
          firstTmdbPage,
        );

        let combinedMovies = firstData.results ?? [];

        if (
          lastTmdbPage !== firstTmdbPage &&
          lastTmdbPage <= TMDB_MAX_PAGE
        ) {
          const secondData = await getCategoryMovies(
            category,
            lastTmdbPage,
          );

          combinedMovies = [
            ...combinedMovies,
            ...(secondData.results ?? []),
          ];
        }

        const offset =
          startIndex -
          (firstTmdbPage - 1) * TMDB_MOVIES_PER_PAGE;

        const currentMovies = combinedMovies.slice(
          offset,
          offset + MOVIES_PER_PAGE,
        );

        setMovieList(currentMovies);

        const accessibleResults = Math.min(
          firstData.total_results ?? 0,
          TMDB_MAX_PAGE * TMDB_MOVIES_PER_PAGE,
        );

        setTotalPages(
          Math.max(
            1,
            Math.ceil(
              accessibleResults / MOVIES_PER_PAGE,
            ),
          ),
        );
      } catch (error) {
        console.error("Failed to fetch movies:", error);

        setMovieList([]);
        setHeroMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    updateMovieList();
  }, [category, currentPage]);

  const changePage = (page) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("category", category);
    newParams.set("page", String(page));

    setSearchParams(newParams);

    movieListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const paginationItems = getPaginationItems(
    currentPage,
    totalPages,
  );

  return (
    <div className="relative overflow-x-hidden">
      {!isLoading && heroMovies.length > 2 ? (
        <HeroSection heroMovies={heroMovies} />
      ) : (
        <HeroSkeleton />
      )}

      <div
        ref={movieListRef}
        className="scroll-mt-20"
      >
        <MovieListSection movieList={movieList} />
      </div>

      {!isLoading && totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-2 mb-20 sm:mb-30"
          aria-label="Movie pagination"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            className="
              relative px-2 py-2
              disabled:text-gray-500
              disabled:cursor-auto
              disabled:hover:after:scale-x-0
            "
          >
            Previous
          </button>

          {paginationItems.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-10 text-center"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = currentPage === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => changePage(item)}
                aria-label={`Go to page ${item}`}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative px-2 py-2
                  text-sm font-medium
                  after:absolute after:left-0 after:-bottom-0
                  after:h-px after:w-full after:bg-current
                  after:origin-left
                  after:transition-transform after:duration-300 after:ease-in-out
                  ${
                    isActive
                      ? "font-bold after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100"
                  }
                `}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => changePage(currentPage + 1)}
            className="
              relative px-2 py-2
              disabled:text-gray-500
              disabled:cursor-auto
              disabled:hover:after:scale-x-0
            "
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};