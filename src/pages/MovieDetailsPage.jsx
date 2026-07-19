import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMovieDetails } from "../services/movieService";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getMovieDetails(movieId);
        setMovieData(data);
        console.log('data', data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setErrorMessage("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return (
    <div>MovieDetailsPage</div>
  )
}
