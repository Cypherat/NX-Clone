import useAuth from "@/hooks/useAuth";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 p-500 m-500">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="why would u disable JS?"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink drop-shadow-md text-shadow-md">Home</li>
          <li className="headerLink drop-shadow-md text-shadow-md">Tv Shows</li>
          <li className="headerLink drop-shadow-md text-shadow-md">Movies</li>
          <li className="headerLink drop-shadow-md text-shadow-md">New & Popular</li>
          <li className="headerLink drop-shadow-md text-shadow-md">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline " />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* change this later back  */}
        {/* <Link href="/account"> */}
          <img
          onClick={logout}
            src="https://rb.gy/g1pwyx"
            alt="hello friend"
            className="cursor-pointer rounded"
          />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
