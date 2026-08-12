import { PageLayout } from "../components/common/PageLayout";
import { MovieList } from "../components/movies/MovieList";
import { Button } from "../components/common/Button";
import { useFavourites } from "../hooks/useFavourites";

export const FavouritesPage = () => {
  const { favorites } = useFavourites();

  if (favorites.length === 0) {
    return (
      <PageLayout
        title="FAVOURITES"
        subtitle="Your spotlight is waiting"
        description="You haven't added any movies to your favourites yet. Save movies you love and they'll appear here."
      >
        <Button to="/">Back to Home</Button>
      </PageLayout>
    );
  }

  return (
    <div className="flex w-full flex-col items-center px-4 pt-24 pb-32 md:pt-[200px] md:pb-[300px]">
      <h1 className="mb-16 text-4xl leading-tight font-bold tracking-wider md:mb-[124px] md:text-[64px]">
        FAVOURITES
      </h1>

      <div className="m-auto mb-16 w-full max-w-[1260px] px-4">
        <MovieList movieList={favorites} />
      </div>
    </div>
  );
};