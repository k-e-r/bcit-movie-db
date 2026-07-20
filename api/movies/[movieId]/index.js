export default async function getMovieDetails(request, response) {
  const { movieId } = request.query;

  if (!movieId) {
    return response.status(400).json({
      message: "Movie's movieId is required.",
    });
  }

  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
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
        message: "Failed to fetch movie details from TMDb.",
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