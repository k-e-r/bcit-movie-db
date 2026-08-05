const fetchMovieApi = async (path) => {
  const response = await fetch(`${path}`);

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

export const getMovieCredits = (movieId) => {
  return fetchMovieApi(`/api/movies/${movieId}/credits`);
};

export const getMovieVideos = (movieId) => {
  return fetchMovieApi(`/api/movies/${movieId}/videos`);
};