import { useEffect, useState } from "react";
import { Link } from "react-router";

import { FavouriteButton } from "../common/FavouriteButton";

export const MovieCard = ({ movieData }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const movieDetailsPath = `/movies/${movieData.id}`;

  return (
    <article>
      <Link
        to={movieDetailsPath}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-300">
          {isImageLoading && (
            <div
              className="absolute inset-0 animate-pulse bg-gray-300"
              aria-hidden="true"
            />
          )}

          <img
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            alt={movieData.title}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${isImageLoading ? "opacity-0" : "opacity-100"} ${isHovered ? "scale-105" : ""} h-full w-full object-cover transition duration-300`}
          />
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3">
        {isImageLoading ? (
          <div
            className="mt-2 sm:mt-3 flex-1 animate-pulse space-y-2"
            aria-hidden="true"
          >
            <div className="h-5 w-2/3 rounded bg-gray-300" />
            <div className="h-4 w-2/5 rounded bg-gray-300" />
          </div>
        ) : (
          <Link
              to={movieDetailsPath}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`pt-2 sm:pt-3 w-full`}
          >
            <h2 className="text-md sm:text-xl font-bold">
              {movieData.title}
            </h2>

            <p className="text-xs sm:text-sm">
              {movieData.release_date?.replaceAll("-", "/")}
            </p>
          </Link>
        )}

        <FavouriteButton
          movieData={movieData}
          className="mt-2 w-8 sm:mt-3 sm:w-10 stroke-3"
        />
      </div>
    </article>
  );
};