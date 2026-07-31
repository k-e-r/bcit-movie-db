export const MovieDetailTitleSkeleton = () => {
  return <div className="mt-4 h-12 w-3/4 rounded bg-gray-300 animate-pulse" />
}

export const MovieDetailInfoSkeleton = () => {
  return <div className="mt-4 h-12 w-2/7 rounded bg-gray-300 animate-pulse" />
}

export const MovieDetailContentSkeleton = () => {
  return (
    <div className="mt-6 space-y-1">
      <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <div className="h-4 w-2/3 rounded bg-gray-300 animate-pulse" />
    </div>
  )
}
