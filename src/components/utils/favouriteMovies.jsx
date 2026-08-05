export const getStoredFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
};

export const isFavoriteMovie = (movie) => {
    const favorites = getStoredFavorites();
    return favorites.some((fav) => fav.id === movie.id);
};

export const toggleFavoriteMovie = (movie) => {
    const favorites = getStoredFavorites();
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    let updatedFavorites;
    if (isAlreadyFavorite) {
    updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
    updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    return !isAlreadyFavorite;

};