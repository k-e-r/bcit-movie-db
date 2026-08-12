import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

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

    const previousCategory = previousParams.get("category");
    const currentCategory = currentParams.get("category");

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