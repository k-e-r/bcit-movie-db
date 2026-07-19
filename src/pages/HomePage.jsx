import { useState, useEffect, useRef } from "react"
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

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categorySectionRef = useRef(null);

  const queryCategory = searchParams.get("category");
  const category = VALID_CATEGORIES.includes(queryCategory)
    ? queryCategory
    : DEFAULT_CATEGORY;

  const updateMovieList = async () => {
    setIsLoading(true);

    try {
      const data = await getCategoryMovies(category);
      setMovieList(data.results ?? []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchParams.has("category")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    categorySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    updateMovieList();
  }, [category, searchParams]);

  useEffect(() => {
    updateMovieList();
  }, []);

  return (
    <>
      <div className="relative">
        {movieList.length > 0 && movieList[0].backdrop_path ? (
          <HeroSection heroMovie={movieList[0]} />
        ) : (
          <HeroSkeleton />
        )}

        <MovieListSection
          ref={categorySectionRef}
          movieList={movieList}
        />
      </div>
    </>
  )
}
