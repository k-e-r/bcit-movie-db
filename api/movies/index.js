const CATEGORIES = [
  "popular",
  "top_rated",
  "now_playing",
  "upcoming",
];

export default async function getCategoryMovies(request, response) {
  const category = request.query.category ?? "now_playing";

  if (!CATEGORIES.includes(category)) {
    return response.status(400).json({
      message: "Invalid movie category.",
    });
  }

  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
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

      return response.status(tmdbResponse.status).json({
        message: "Failed to fetch movies from TMDb.",
        tmdbStatus: tmdbResponse.status,
        tmdbError: data,
      });
    }

    return response.status(200).json(data);
  } catch (error) {
    console.error("Function error:", error);

    return response.status(500).json({
      message: "Internal server error.",
    });
  }
}