import { CategorySelector } from "./CategorySelector"
import { MovieList } from "./MovieList"

export const MovieListSection = ({ ref, movieList }) => {
  return (
    <section ref={ref} className="scroll-mt-24 px-4 pb-40 sm:pb-60 max-w-[1260px] m-auto">
      <CategorySelector />

      <MovieList movieList={movieList} />
    </section>
  )
}
