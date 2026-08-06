import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '../components/common/Button'
import { PageLayout } from '../components/common/PageLayout'
import { HeartIcon } from '../components/icons/HeartIcon'
import {
  BackdropSkeleton,
  MovieDetailCastSkeleton,
  MovieDetailContentSkeleton,
  MovieDetailInfoSkeleton,
  MovieDetailLoadingStatus,
  MovieDetailTitleSkeleton,
  MovieDetailTrailerSkeleton,
  SkeletonLoading,
} from '../components/movies/MovieDetailSkeleton'
import { getMovieCredits, getMovieDetails, getMovieVideos } from '../services/movieService'
import { FavouriteButton } from '../components/common/FavouriteButton'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed'

export const MovieDetailsPage = () => {
  const { movieId } = useParams()

  const [movieData, setMovieData] = useState({ details: '', credits: '', videos: {} })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const releasedYear = String(new Date(movieData.details?.release_date).getFullYear()) || ''
  const formattedRuntime = `${Math.floor(movieData.details?.runtime / 60)}h ${movieData.details?.runtime % 60}m`
  const formattedRate = movieData.details?.vote_average?.toFixed(1)
  const posterUrl = `${TMDB_IMAGE_BASE_URL}${movieData.details?.backdrop_path}`
  const casts = movieData.credits?.cast?.map(({ name, profile_path }) => ({
    name,
    src: profile_path ? `${TMDB_IMAGE_BASE_URL}${profile_path}` : null,
  }))
  const trailers = movieData.videos.results
    ?.filter(({ type, site }) => type === 'Trailer' && site === 'YouTube')
    .map(({ key }) => `${YOUTUBE_EMBED_URL}/${key}`)

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [details, credits] = await Promise.all([getMovieDetails(movieId), getMovieCredits(movieId)])
        const videos = await getMovieVideos(movieId)

        setMovieData({
          details,
          credits,
          videos,
        })

        console.log('details', details)
        console.log('credits', credits)
        console.log('videos', videos)
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
              <div className="flex items-start gap-3 md:gap-5 mb-[10px] lg:mb-[40px]">
                <h1 className="font-bold inline-block text-2xl md:text-4xl lg:text-5xl">{movieData.details?.title}</h1>
                <FavouriteButton movieData={movieData.details} className="w-8 sm:w-10 stroke-3" />
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
            <SkeletonLoading skeleton={<MovieDetailCastSkeleton />} isLoading={isLoading}>
              <div
                className={`flex w-full overflow-x-auto gap-2 lg:gap-3 pb-2 ${trailers?.length === 0 && 'mb-[175px]'}`}>
                {casts?.map(({ name, src }, i) => (
                  <div key={i} className="w-[100px] lg:w-[200px] shrink-0">
                    <img
                      src={src}
                      alt=""
                      className={`w-full h-[160px] lg:h-[300px] object-cover mb-2 lg:mb-3 ${src ? '' : 'bg-gray-200'}`}
                    />
                    <p className="text-center text-xs lg:text-2xl">{name}</p>
                  </div>
                ))}
              </div>
            </SkeletonLoading>
          </section>
          {(isLoading || trailers?.length > 0) && (
            <section>
              <h2 className="movie-detail-subtitle">Trailer</h2>
              <SkeletonLoading skeleton={<MovieDetailTrailerSkeleton />} isLoading={isLoading}>
                {trailers?.map((el, i) => (
                  <iframe
                    key={i}
                    className="w-full aspect-video not-last:mb-8 lg:not-last:mb-20 last:mb-[175px]"
                    src={el}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                ))}
              </SkeletonLoading>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

const MovieDetailsError = ({ errorMessage }) => {
  const navigate = useNavigate()

  return (
    <PageLayout subtitle={errorMessage}>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </PageLayout>
  )
}
