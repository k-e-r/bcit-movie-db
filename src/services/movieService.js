const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const fetchMovieApi = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status}`,
    );
  }

  return response.json();
};

export const getCategoryMovies = (category = "now_playing") => {
  return fetchMovieApi(`/api/movies?category=${category}`);
};

export const getMovieDetails = (movieId) => {
  return fetchMovieApi(`/api/movies/${movieId}`);
};