import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMovieDetails, getMovieCredits } from "../services/movieService";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState({details: "", credits: ""});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovieData(prev => prev.details = movieDetails);
        console.log('movieDetails', movieDetails);

        const movieCredits = await getMovieCredits(movieId);
        setMovieData(prev => prev.credits = movieCredits);
        console.log('movieCredits', movieCredits);
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
