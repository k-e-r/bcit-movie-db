import { useState } from 'react'

const FAVOURITE_MOVIES_KEY = 'bcitMovieDb:favouriteMovies'

export const useFavourites = movieId => {
  const favouriteMovies = JSON.parse(localStorage.getItem(FAVOURITE_MOVIES_KEY) || '[]')
  const isFavouriteMovieExisted = Array.isArray(favouriteMovies) ? favouriteMovies?.includes(movieId) : false

  const [isFavourite, setIsFavourite] = useState(isFavouriteMovieExisted)

  const toggleFavouriteMovie = () => {
    const updatedFavouriteMovies = isFavouriteMovieExisted
      ? favouriteMovies.filter(el => el !== movieId)
      : [...favouriteMovies, movieId]

    localStorage.setItem(FAVOURITE_MOVIES_KEY, JSON.stringify(updatedFavouriteMovies))
    setIsFavourite(el => !el)
  }

  return { isFavourite, toggleFavouriteMovie }
}
