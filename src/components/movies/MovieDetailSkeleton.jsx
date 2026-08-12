export const MovieDetailTitleSkeleton = () => {
  return <div aria-hidden="true" className="mt-4 h-12 w-3/4 rounded bg-gray-300 animate-pulse" />
}

export const MovieDetailInfoSkeleton = () => {
  return <div aria-hidden="true" className="mt-4 h-12 w-2/7 rounded bg-gray-300 animate-pulse" />
}

export const MovieDetailContentSkeleton = () => {
  return (
    <div aria-hidden="true" className="mt-6 space-y-1">
      <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <div className="h-4 w-2/3 rounded bg-gray-300 animate-pulse" />
    </div>
  )
}

export const MovieDetailCastSkeleton = () => {
  return (
    <div aria-hidden="true" className="w-fit">
      <div className="w-[100px] lg:w-[200px] h-[160px] lg:h-[300px] mb-2 lg:mb-3 animate-pulse bg-gray-500"></div>
      <div className="h-4 w-2/3 rounded bg-gray-300 animate-pulse mx-auto" />
    </div>
  )
}

export const MovieDetailTrailerSkeleton = () => {
  return <div aria-hidden="true" className="w-full aspect-video mb-[175px] animate-pulse bg-gray-500"></div>
}

export const BackdropSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="mb-[47px] md:mb-[65px] lg:mb-[80px] h-[470px] lg:h-[1080px] animate-pulse w-full bg-gray-500"></div>
  )
}

export const MovieDetailLoadingStatus = ({ isLoading }) => {
  return (
    <div className="sr-only" role="status" aria-live="polite">
      {isLoading ? 'Loading movie details' : ''}
    </div>
  )
}

export const SkeletonLoading = ({ isLoading, skeleton, children }) => (isLoading ? skeleton : children)
