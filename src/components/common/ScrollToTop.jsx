import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const DEFAULT_CATEGORY = "popular";

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  const previousLocation = useRef({
    pathname,
    search,
  });

  useEffect(() => {
    const previous = previousLocation.current;
    const previousParams = new URLSearchParams(previous.search);
    const currentParams = new URLSearchParams(search);
    const previousCategory = previousParams.get("category") ?? DEFAULT_CATEGORY;
    const currentCategory = currentParams.get("category") ?? DEFAULT_CATEGORY;
    const pathnameChanged = previous.pathname !== pathname;
    const categoryChanged = previousCategory !== currentCategory;

    if (pathnameChanged || categoryChanged) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    previousLocation.current = {
      pathname,
      search,
    };
  }, [pathname, search]);

  return null;
};