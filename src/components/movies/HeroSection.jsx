import { useEffect, useState } from "react";
import { HeroSkeleton } from "./HeroSkelton";
import { Link } from "react-router";

export const HeroSection = ({ heroMovies }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [heroData, setHeroData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const images = heroMovies.filter((movie) => movie.backdrop_path);
    setHeroData(images);
  }, [heroMovies])

  const showNextSlide = () => {
    setCurrentIndex((prev) => prev === heroData.length - 1 ? 0 : prev + 1,);
  };

  const selectSlide = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <section className="relative max-h-[800px] h-[80vh] bg-black">
      {isImageLoading && (
          <div
            className="absolute inset-0 animate-pulse bg-gray-300"
            aria-hidden="true"
          />
      )}
      <div className="relative">
        {heroData.map((item, idx) => {
          const isActive = idx === currentIndex;

          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive
                  ? "z-1 opacity-100"
                  : "z-0 opacity-0"
              }`}
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt={item.title}
                  loading="lazy"
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => setIsImageLoading(false)}
                  className={`${isImageLoading ? "opacity-0" : "opacity-100"} max-h-[800px] object-cover h-[80vh] brightness-40 w-svw max-w-svw`}
                />

                <div className="absolute left-1/2 transform -translate-x-1/2 z-1 bottom-0 max-w-[1260px] w-full h-full block flex items-end justify-end">
                  <div className="max-w-[700px] w-full text-white px-7 sm:px-15 pb-17 sm:pb-25 flex flex-col gap-6">
                    <h1 className="text-4xl">{item.title}</h1>
                    <p className="text-sm">{item.overview}</p>
                    <Link className="border rounded-full py-2 px-4 font-bold w-fit hover:bg-black hover:border-black transition-all duration-300 ease-in-out" to={`/movies/${item.id}`}>More Info</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 z-1 bottom-0 max-w-[1260px] w-full block">
        <div className="flex p-2 sm:p-5 gap-2 w-fit m-auto">
          {heroData.map((_, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectSlide(idx)}
                className="relative py-5 h-[1.5px] w-12 flex-1 overflow-hidden"
              >
                  <span
                    className="absolute top-[50%] transform-y-[-50%] left-0 block h-[1.5px] w-12 origin-left bg-white/30"
                    onAnimationEnd={showNextSlide}
                  />
                {isActive && (
                  <span
                    className="absolute top-[50%] transform-y-[-50%] left-0 block h-[1.5px] w-12 origin-left bg-white"
                    style={{
                      animation: `hero-progress 8000ms linear`,
                    }}
                    onAnimationEnd={showNextSlide}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  )
}
