const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export const getCategoryMovies = async (category = 'now_playing') => {
  const response = await fetch(
    `${API_BASE_URL}/api/movies?category=${category}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status}`,
    );
  }

  return response.json();
};