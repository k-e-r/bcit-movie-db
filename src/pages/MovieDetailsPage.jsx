import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getMovieCredits, getMovieDetails } from '../services/movieService'

import {
  BackdropSkeleton,
  MovieDetailContentSkeleton,
  MovieDetailInfoSkeleton,
  MovieDetailLoadingStatus,
  MovieDetailTitleSkeleton,
  SkeletonLoading,
} from '../components/movies/MovieDetailSkeleton'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

export const MovieDetailsPage = () => {
  const { movieId } = useParams()

  const [movieData, setMovieData] = useState({ details: '', credits: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const releasedYear = String(new Date(movieData.details?.release_date).getFullYear()) || ''
  const formattedRuntime = `${Math.floor(movieData.details?.runtime / 60)}h ${movieData.details?.runtime % 60}m` || ''
  const formattedCast =
    movieData.credits?.cast?.reduce((prev, { name }) => (prev ? `${prev} / ${name}` : name), '') || ''
  const formattedRate = movieData.details?.vote_average?.toFixed(1)
  const posterUrl = `${TMDB_IMAGE_BASE_URL}/${movieData.details?.backdrop_path}`

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [details, credits] = await Promise.all([getMovieDetails(movieId), getMovieCredits(movieId)])

        setMovieData({
          details,
          credits,
        })

        console.log('details', details)
        console.log('credits', credits)
      } catch (error) {
        console.error('Failed to fetch movie data:', error)
        setErrorMessage('Failed to load movie details.')
      } finally {
        setIsLoading(false)
      }
    }

    if (movieId) {
      fetchMovieData()
    }
  }, [movieId])

  return (
    <div aria-busy={isLoading}>
      <MovieDetailLoadingStatus isLoading={isLoading} />
      <SkeletonLoading skeleton={<BackdropSkeleton />} isLoading={isLoading}>
        <img
          src={posterUrl}
          alt=""
          className="mb-[2.9375rem] md:mb-[4.0625rem] lg:mb-[5rem] h-[29.375rem] lg:h-[67.5rem] object-cover"
        />
      </SkeletonLoading>
      <div className="mx-auto max-w-[18.75rem] md:max-w-[42.125rem] lg:max-w-[78.75rem]">
        <div className="flex flex-col gap-[2.5rem] lg:gap-[5rem]">
          <section>
            <SkeletonLoading skeleton={<MovieDetailTitleSkeleton />} isLoading={isLoading}>
              <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-[.625rem] lg:mb-[2.5rem]">
                {movieData.details?.title}
              </h1>
            </SkeletonLoading>
            <SkeletonLoading skeleton={<MovieDetailInfoSkeleton />} isLoading={isLoading}>
              <p className="font-bold text-lg lg:text-4xl">
                <span>☆{formattedRate}</span>・<span>{releasedYear}</span>・<span>{formattedRuntime}</span>
              </p>
            </SkeletonLoading>
          </section>
          <section>
            <h2 className="movie-detail-subtitle">Introduction</h2>
            <SkeletonLoading skeleton={<MovieDetailContentSkeleton />} isLoading={isLoading}>
              <p className="text-xs lg:text-2xl">{movieData.details?.overview}</p>
            </SkeletonLoading>
          </section>
          <section>
            <h2 className="movie-detail-subtitle">Cast</h2>
            <SkeletonLoading skeleton={<MovieDetailContentSkeleton />} isLoading={isLoading}>
              <p className="text-xs lg:text-2xl">{formattedCast}</p>
            </SkeletonLoading>
          </section>
          <section>
            <h2 className="movie-detail-subtitle">Trailer</h2>
          </section>
        </div>
      </div>
    </div>
  )
}
