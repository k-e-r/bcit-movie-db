import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PageLayout } from '../components/common/PageLayout'
import { HeartIcon } from '../components/icons/HeartIcon'
import {
  BackdropSkeleton,
  MovieDetailContentSkeleton,
  MovieDetailInfoSkeleton,
  MovieDetailLoadingStatus,
  MovieDetailTitleSkeleton,
  SkeletonLoading,
} from '../components/movies/MovieDetailSkeleton'
import { useFavourites } from '../hooks/useFavourites'
import { getMovieCredits, getMovieDetails } from '../services/movieService'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

export const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()

  const [movieData, setMovieData] = useState({ details: '', credits: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const releasedYear = String(new Date(movieData.details?.release_date).getFullYear()) || ''
  const formattedRuntime = `${Math.floor(movieData.details?.runtime / 60)}h ${movieData.details?.runtime % 60}m`
  const formattedCast =
    movieData.credits?.cast?.reduce((prev, { name }) => (prev ? `${prev} / ${name}` : name), '') || ''
  const formattedRate = movieData.details?.vote_average?.toFixed(1)
  const posterUrl = `${TMDB_IMAGE_BASE_URL}${movieData.details?.backdrop_path}`

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

  if (errorMessage) return <MovieDetailsError errorMessage={errorMessage} />

  return (
    <div aria-busy={isLoading}>
      <MovieDetailLoadingStatus isLoading={isLoading} />
      <SkeletonLoading skeleton={<BackdropSkeleton />} isLoading={isLoading}>
        <img
          src={posterUrl}
          alt=""
          className="mx-auto mb-[47px] md:mb-[65px] lg:mb-[80px] h-[470px] lg:h-[1080px] object-cover"
        />
      </SkeletonLoading>

      <div className="mx-auto max-w-[300px] md:max-w-[674px] lg:max-w-[1260px]">
        <div className="flex flex-col gap-[40px] lg:gap-[80px]">
          <section>
            <SkeletonLoading skeleton={<MovieDetailTitleSkeleton />} isLoading={isLoading}>
              <div className="flex items-center gap-2.5 md:gap-3 mb-[10px] lg:mb-[40px]">
                <h1 className="font-bold inline-block text-2xl md:text-4xl lg:text-5xl">{movieData.details?.title}</h1>
                <FavouriteButton movieId={movieData.details?.id} />
              </div>
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

const FavouriteButton = ({ movieId }) => {
  const { isFavourite, toggleFavouriteMovie } = useFavourites(movieId)

  return (
    <button
      type="button"
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      onClick={toggleFavouriteMovie}
      className="w-7 md:w-9 lg:w-11">
      <HeartIcon className={`w-full pt-1 transition-colors hover:fill-black ${isFavourite ? 'fill-black' : ''}`} />
    </button>
  )
}

const MovieDetailsError = ({ errorMessage }) => {
  return (
    <PageLayout subtitle={errorMessage}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="hover:text-gray-400 transition-colors duration-300 ease-in-out underline underline-offset-1">
        Go back
      </button>
    </PageLayout>
  )
}
