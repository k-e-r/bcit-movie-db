import { createContext, useState } from "react";

export const FavouriteContext = createContext();

const FAVOURITE_MOVIES_KEY = "bcitMovieDb:favouriteMovies";

const getStoredFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem(FAVOURITE_MOVIES_KEY);

    const parsedFavorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter((movie) => movie?.id != null);
  } catch (error) {
    console.error("Failed to read favorites:", error);
    return [];
  }
};

export const FavouriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  const toggleFavouriteMovie = (movie) => {
    if (movie?.id == null) return;

    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (favorite) => favorite.id === movie.id
      );

      const updatedFavorites = exists
        ? currentFavorites.filter(
            (favorite) => favorite.id !== movie.id
          )
        : [...currentFavorites, movie];

      localStorage.setItem(
        FAVOURITE_MOVIES_KEY,
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  const isFavouriteMovie = (movieId) => {
    if (movieId == null) return false;

    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavouriteContext.Provider
      value={{
        favorites,
        isFavouriteMovie,
        toggleFavouriteMovie,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};