import { CategorySelector } from "./CategorySelector"
import { MovieList } from "./MovieList"

export const MovieListSection = ({ movieList }) => {
  return (
    <section className="px-4 pb-20 sm:pb-30 max-w-[1260px] m-auto">
      <CategorySelector />

      <MovieList movieList={movieList} />
    </section>
  )
}
