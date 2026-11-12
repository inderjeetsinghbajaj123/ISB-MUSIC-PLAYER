import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navabar = () => {
  return (
    <div className="z-40 w-full h-16 md:h-20 bg-black/95 fixed bottom-0 md:top-0 text-white flex justify-around md:justify-center items-center gap-0 md:gap-12.5 px-2 py-1 md:p-3 rounded-t-2xl md:rounded-t-[30px] border-t border-white/10 backdrop-blur-xl">
      <NavLink
        to={"/"}
        aria-label="Home"
        className={({ isActive }) =>
          `min-w-14 md:min-w-0 p-2 md:p-3 rounded-2xl flex flex-col items-center gap-0.5 transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <IoIosHome className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-[10px] leading-none md:hidden">Home</span>
      </NavLink>
      <NavLink
        to={"/search"}
        aria-label="Search"
        className={({ isActive }) =>
          `min-w-14 md:min-w-0 p-2 md:p-3 rounded-2xl flex flex-col items-center gap-0.5 transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <FaSearch className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-[10px] leading-none md:hidden">Search</span>
      </NavLink>
      <NavLink
        to={"/playlist"}
        aria-label="Playlist"
        className={({ isActive }) =>
          `min-w-14 md:min-w-0 p-2 md:p-3 rounded-2xl flex flex-col items-center gap-0.5 transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <RiPlayListFill className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-[10px] leading-none md:hidden">Playlist</span>
      </NavLink>
      <NavLink
        to={"/like"}
        aria-label="Liked songs"
        className={({ isActive }) =>
          `min-w-14 md:min-w-0 p-2 md:p-3 rounded-2xl flex flex-col items-center gap-0.5 transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <FaHeart className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-[10px] leading-none md:hidden">Liked</span>
      </NavLink>
    </div>
  );
};

export default Navabar;
