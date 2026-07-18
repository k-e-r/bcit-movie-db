import { useEffect, useState } from "react";
import { HeroSkeleton } from "./HeroSkelton";
import { Link } from "react-router";

export const HeroSection = ({ heroMovie }) => {
  const [heroImg, setHeroImg] = useState(null)
  console.log("heroMovie", heroMovie);
  console.log("backdrop_path", heroMovie.backdrop_path);

  useEffect(() => {
    if (heroMovie.backdrop_path) {
      setHeroImg(heroMovie.backdrop_path);
    }

  }, [heroMovie])

  return (
    <section className="relative">
      <img
        className="object-cover h-[80vh] w-full brightness-40"
        src={import.meta.env.VITE_URL_DOMAIN + heroImg}
        alt={heroMovie.title}
      />

      <div className="absolute left-1/2 transform -translate-x-1/2 z-1 bottom-0 max-w-[1260px] w-full h-full block flex items-end justify-end">
        <div className="max-w-[700px] w-full text-white p-7 sm:p-15 flex flex-col gap-6">
          <h1 className="text-4xl">{heroMovie.title}</h1>
          <p className="text-sm">{heroMovie.overview}</p>
          <Link className="border rounded-full py-2 px-4 font-bold w-fit hover:bg-black hover:border-black transition-all duration-300 ease-in-out" to={`/movies/${heroMovie.id}`}>More Info</Link>
        </div>
      </div>
    </section>
  )
}
