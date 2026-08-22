const CATEGORIES = [
  "popular",
  "top_rated",
  "now_playing",
  "upcoming",
];

export const getCategoryMovies = async (category = "now_playing", page = 1) => {
  const requestedPage =
    Number.isInteger(page) &&
    page >= 1 &&
    page <= 500
      ? page
      : 1;

  if (!CATEGORIES.includes(category)) {
    return;
  }

  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    const data = await tmdbResponse.json();

    if (!tmdbResponse.ok) {
      console.error("TMDb error:", {
        status: tmdbResponse.status,
        data,
      });

      return;
    }

    return data;
  } catch (error) {
    console.error("Function error:", error);

    return;
  }
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return await response.json();
};


export const getMovieCredits = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return await response.json();
};


export const getMovieVideos = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return await response.json();
};