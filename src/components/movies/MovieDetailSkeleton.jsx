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

export const BackdropSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="mb-[2.9375rem] md:mb-[4.0625rem] lg:mb-[5rem] h-[29.375rem] lg:h-[67.5rem] animate-pulse w-full bg-gray-500"></div>
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
