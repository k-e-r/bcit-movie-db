import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMovieDetails, getMovieCredits } from "../services/movieService";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState({details: "", credits: ""});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const [details, credits] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
        ]);

        setMovieData({
          details,
          credits,
        });

        console.log('details', details);
        console.log('credits', credits);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
        setErrorMessage("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  return (
    <div>MovieDetailsPage</div>
  )
}
