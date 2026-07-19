import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieCardSkelton } from "./MovieCardSkelton";

const SKELETON_COUNT = 12;

export const MovieList = ({ movieList }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieList?.length > 0) {
      setIsLoading(true);
    }
  }, [movieList])

  return (
    <div className="gap-x-3 sm:gap-x-5 gap-y-5 sm:gap-y-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading && movieList?.length > 11 ? (
        <>
          {movieList.slice(0, SKELETON_COUNT).map((val, idx) => (
            <MovieCard key={idx} movieData={val} />
          ))}
          </>
      ) : Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
        <MovieCardSkelton key={idx} />
      ))}
      </div>
  )
}
