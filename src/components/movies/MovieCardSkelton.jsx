import { useEffect, useState } from "react";
import { HeartIcon } from "../icons/HeartIcon";

export const MovieCardSkelton = () => {
  return (
    <>
      <div className="animate-pulse h-full w-full opacity-90 rounded-t-xl">
        <div className="w-full h-full flex flex-col">
          <div className="aspect-[2/3] w-full rounded-xl bg-gray-300" />

          <div className="mt-3 flex">
            <div className="animate-pulse space-y-2 gap-3 w-full">
              <div className="h-5 w-2/3 rounded bg-gray-300" />
              <div className="h-4 w-2/5 rounded bg-gray-300" />
            </div>
            <div className="w-[50px] h-auto rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </>
  )
}
