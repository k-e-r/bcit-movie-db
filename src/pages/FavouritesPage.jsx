import { PageLayout } from "../components/common/PageLayout";

export const FavouritesPage = ({ favorites = [] }) => {
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
    <PageLayout 
      title="FAVOURITES">
    </PageLayout>
  );
};

