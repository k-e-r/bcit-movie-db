export const HeroSkeleton = () => {
  return (
    <section
      aria-label="Loading featured movie"
      className="max-h-[800px] h-[80vh] animate-pulse bg-gray-800 w-full"
    >
      <div className="absolute left-1/2 transform -translate-x-1/2 z-1 bottom-0 max-w-[1260px] w-full h-full block flex items-end justify-end">
        <div className="max-w-[700px] w-full text-white p-7 sm:p-15 flex flex-col gap-6">
          <div className="w-full max-w-xl">
            <div className="mt-4 h-12 w-3/4 rounded bg-gray-600" />

            <div className="mt-6 space-y-1">
              <div className="h-4 w-full rounded bg-gray-600" />
              <div className="h-4 w-full rounded bg-gray-600" />
              <div className="h-4 w-full rounded bg-gray-600" />
              <div className="h-4 w-2/3 rounded bg-gray-600" />
            </div>

            <div className="mt-6 h-[42px] w-[107px] rounded-full bg-gray-600" />
          </div>
        </div>
      </div>
    </section>
  );
};