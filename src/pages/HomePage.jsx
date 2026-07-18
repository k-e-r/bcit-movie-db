import { useState, useEffect } from "react"

import { getCategoryMovies } from "../services/movieService";
import { HeroSection } from "../components/movies/HeroSection";
import { HeroSkeleton } from "../components/movies/HeroSkelton";

export const HomePage = () => {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getCategoryMovies("now_playing");
        setHeroMovie(data?.results[0]);
        console.log("data", data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    init();
  }, []);

  return (
    <>
      <div className="relative">
        {heroMovie ? (
          <HeroSection heroMovie={heroMovie} />
        ) : (
          <HeroSkeleton />
        )}
      </div>
    </>
  )
}
