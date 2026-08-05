import { useState, useEffect } from "react";
import { PageLayout } from "../components/common/PageLayout";
import { MovieList } from "../components/movies/MovieList";
import { getStoredFavorites } from "../components/utils/favouriteMovies";

export const FavouritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = getStoredFavorites();
    setFavorites(stored);
    console.log("movie", stored);
  }, []);

  if (favorites.length === 0) {
    return (
      <PageLayout
        title="FAVOURITES"
        subtitle="Your spotlight is waiting"
        description="You haven't added any movies to your favorites yet. Save movies you love and they'll appear here."
      />
    );
  }

  return (
    <PageLayout title="FAVOURITES">
      <MovieList movieList={favorites} />
    </PageLayout>
  );
};