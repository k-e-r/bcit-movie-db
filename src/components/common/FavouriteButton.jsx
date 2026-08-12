import { HeartIcon } from "../icons/HeartIcon";
import { useFavourites } from "../../hooks/useFavourites";
import { useToast } from "../../hooks/useToast";

export const FavouriteButton = ({
  movieData,
  className = "",
  baseColour = "black",
  strokeWidth = 1.5,
}) => {
  const { isFavouriteMovie, toggleFavouriteMovie } = useFavourites();
  const { showToast } = useToast();

  if (!movieData?.id) {
    return null;
  }

  const isFavourite = isFavouriteMovie(movieData.id);

  const defaultStroke =
    baseColour === "white"
      ? "stroke-white"
      : "stroke-[#212121]";

  const handleFavourite = () => {
    toggleFavouriteMovie(movieData);

    showToast(
      isFavourite
        ? "Removed from favourites"
        : "Added to favourites"
    );
  };

  return (
    <button
      type="button"
      onClick={handleFavourite}
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
        strokeWidth={strokeWidth}
      />
    </button>
  );
};