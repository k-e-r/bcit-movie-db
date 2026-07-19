import { useEffect, useState } from "react";
import { HeartIcon } from "../icons/HeartIcon";
import { Link } from "react-router";

export const MovieCard = ({ movieData }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [addFavourite, setAddFavourite] = useState(false);

  const movieDetailsPath = `/movies/${movieData.id}`;

  const addFavouriteMovie = (movie) => {
    setAddFavourite((current) => !current);
    console.log(movie);
  };

  return (
    <article>
      <Link
        to={movieDetailsPath}
        className="group block"
        aria-label={`View details for ${movieData.title}`}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-300">
          {isImageLoading && (
            <div
              className="absolute inset-0 animate-pulse bg-gray-300"
              aria-hidden="true"
            />
          )}

          <img
            src={`${import.meta.env.VITE_URL_DOMAIN}${movieData.poster_path}`}
            alt={movieData.title}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </Link>

      <div className="mt-2 sm:mt-3 flex items-start justify-between gap-3">
        {isImageLoading ? (
          <div
            className="flex-1 animate-pulse space-y-2"
            aria-hidden="true"
          >
            <div className="h-5 w-2/3 rounded bg-gray-300" />
            <div className="h-4 w-2/5 rounded bg-gray-300" />
          </div>
        ) : (
          <Link
            to={movieDetailsPath}
            className="hover:text-gray-500"
          >
            <h2 className="text-md sm:text-xl font-bold">
              {movieData.title}
            </h2>

            <p className="text-xs sm:text-sm">
              {movieData.release_date?.replaceAll("-", "/")}
            </p>
          </Link>
        )}

        <button
          type="button"
          aria-label={
            addFavourite
              ? `Remove ${movieData.title} from favourites`
              : `Add ${movieData.title} to favourites`
          }
          aria-pressed={addFavourite}
          onClick={() => addFavouriteMovie(movieData)}
          className="w-8 sm:w-10 shrink-0 cursor-pointer"
        >
          <HeartIcon
            className={`w-full transition-colors hover:fill-black ${
              addFavourite ? "fill-black" : ""
            }`}
          />
        </button>
      </div>
    </article>
  );
};