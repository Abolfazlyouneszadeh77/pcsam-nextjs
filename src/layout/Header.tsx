"use client";
import Navbar from "../components/header/navbar/Navbar";
import ThemeToggle from "../components/header/theme-toggle/ThemeToggle";
import ProfileBtn from "../components/header/profile-botton/ProfileBtn";
import BasketButton from "../components/header/basketButton/BasketButton";
import Logo from "../components/common/logo/Logo";
import ProductSearch from "../components/common/searchProducts/ProductSearch";

const Header = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div
        className="relative h-25 lg:h-15 flex items-center justify-between px-10 lg:px-4 w-full 
        max-w-7xl mx-auto border-b border-gray-300"
      >
        <Navbar />
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>
        <div className="flex items-center gap-5">
          <ProductSearch />
          <div className="hidden lg:block">
            <div className="flex items-center gap-5">
              <ThemeToggle />
              <BasketButton />
              <ProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
