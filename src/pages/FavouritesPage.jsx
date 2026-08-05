import { useState, useEffect } from "react";
import { PageLayout } from "../components/common/PageLayout";
import { MovieList } from "../components/movies/MovieList";
import { getStoredFavorites } from "../components/utils/favouriteMovies";
import { Button } from "../components/common/Button";

export const FavouritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = getStoredFavorites();
    setFavorites(stored);
    console.log("movie", stored);
  }, []);

  if (favorites.length === 0) {
    return (
      <>
      <PageLayout
        title="FAVOURITES"
        subtitle="Your spotlight is waiting"
        description="You haven't added any movies to your favorites yet. Save movies you love and they'll appear here.">
        <Button to="/">
        Back to Home
      </Button>
      </PageLayout>
      </>
    );
  }
  return (
    <div className="w-full flex flex-col items-center text-center px-4 pt-24 pb-32 md:pt-[200px] md:pb-[300px]">
      <h1 className="text-4xl md:text-[64px] font-bold tracking-wider mb-16 md:mb-[124px] leading-tight">
        FAVOURITES  
      </h1>
      <div className="w-full max-w-[1260px] m-auto px-4 mb-16">
        <MovieList movieList={favorites} />
      </div>
    </div>
  );
};