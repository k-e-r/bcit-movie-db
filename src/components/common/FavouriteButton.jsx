import { HeartIcon } from "../icons/HeartIcon";
import { useFavourites } from "../../hooks/useFavourites";

export const FavouriteButton = ({
  movieData,
  className = "",
  baseColour = "black",
}) => {
  const { isFavouriteMovie, toggleFavouriteMovie } = useFavourites();

  if (!movieData?.id) {
    return null;
  }

  const isFavourite = isFavouriteMovie(movieData.id);

  const defaultStroke =
    baseColour === "white"
      ? "stroke-white"
      : "stroke-[#212121]";

  return (
    <button
      type="button"
      onClick={() => toggleFavouriteMovie(movieData)}
      aria-label={
        isFavourite
          ? "Remove from favourites"
          : "Add to favourites"
      }
      aria-pressed={isFavourite}
    >
      <HeartIcon
        className={`${className} w-full hover:fill-[#e20d67] hover:stroke-[#e20d67] ${
          isFavourite
            ? "fill-[#e20d67] stroke-[#e20d67]"
            : `fill-none ${defaultStroke}`
        }`}
      />
    </button>
  );
};