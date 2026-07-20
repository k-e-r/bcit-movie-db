import { useState, useEffect } from "react"
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

  const queryCategory = searchParams.get("category");
  const category = VALID_CATEGORIES.includes(queryCategory)
    ? queryCategory
    : DEFAULT_CATEGORY;

  useEffect(() => {
    const updateMovieList = async () => {

      try {
        const data = await getCategoryMovies(category);
        setMovieList(data.results ?? []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovieList([]);
      }
    };

    updateMovieList();
  }, [category]);

  return (
    <>
      <div className="relative overflow-x-hidden">
        {movieList.length > 2 ? (
          <HeroSection heroMovies={movieList.slice(0, 3)} />
        ) : (
          <HeroSkeleton />
        )}

        <MovieListSection
          movieList={movieList}
        />
      </div>
    </>
  )
}
