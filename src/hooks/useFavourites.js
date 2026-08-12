import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";

export const useFavourites = () => {
  return useContext(FavouriteContext);
};