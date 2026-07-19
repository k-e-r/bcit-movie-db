export const HeroSkeleton = () => {
  return (
    <section
      aria-label="Loading featured movie"
      className="relative max-h-[800px] h-[80vh] animate-pulse w-full bg-gray-500"
    >
      <div className="absolute left-1/2 transform -translate-x-1/2 z-1 top-0 max-w-[1260px] w-full h-full block flex items-end justify-end">
        <div className="max-w-[700px] w-full p-7 sm:p-15 flex flex-col gap-6">
          <div className="w-full max-w-xl">
            <div className="mt-4 h-12 w-3/4 rounded bg-gray-300" />

            <div className="mt-6 space-y-1">
              <div className="h-4 w-full rounded bg-gray-300" />
              <div className="h-4 w-full rounded bg-gray-300" />
              <div className="h-4 w-full rounded bg-gray-300" />
              <div className="h-4 w-2/3 rounded bg-gray-300" />
            </div>

            <div className="mt-6 h-[42px] w-[107px] rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};