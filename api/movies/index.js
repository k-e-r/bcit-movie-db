const CATEGORIES = [
  "popular",
  "top_rated",
  "now_playing",
  "upcoming",
];

export default async function fetchMovieApi(request, response) {
  const category = request.query.category ?? "now_playing";

  const requestedPage = Number(request.query.page ?? 1);

  const page =
    Number.isInteger(requestedPage) &&
    requestedPage >= 1 &&
    requestedPage <= 500
      ? requestedPage
      : 1;

  if (!CATEGORIES.includes(category)) {
    return response.status(400).json({
      message: "Invalid movie category.",
    });
  }

  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
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