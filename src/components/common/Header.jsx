import { useState } from "react";
import { Link } from "react-router";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { LogoIcon } from "../icons/LogoIcon";
import { BurgerMenuIcon } from "../icons/BurgerMenuIcon";
import { CloseIcon } from "../icons/CloseIcon";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-999 w-full bg-black">
        <div className="max-w-[1260px] py-5 px-4 sm:px-8 flex justify-between items-center m-auto">
          <Link to="/" aria-label="Go to Home">
            <LogoIcon className="brightness-0 invert w-[30px] h-auto hover:opacity-60 transition-all duration-300 ease-in-out" />
          </Link>

          <DesktopNav />

          <button
            type="button"
            className="block sm:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {!isMenuOpen ? (
              <BurgerMenuIcon className="w-[25px] h-auto cursor-pointer" aria-hidden="true" />
            ) : (
              <CloseIcon className="w-[25px] h-auto cursor-pointer" aria-hidden="true" />
            )}
          </button>

          <MobileNav isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
        </div>
      </header>

      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-2 bg-black/50 sm:hidden cursor-pointer"
          aria-label="Close navigation"
          onClick={closeMenu}
        />
      )}
    </>
  )
}
