import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navabar = () => {
  return (
    <div className="z-30 w-full h-20 bg-black fixed bottom-0 md:top-0 text-white flex justify-around md:justify-center items-center gap-12.5 p-3 rounded-t-[30px]">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `p-3 rounded-2xl transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <IoIosHome className="w-6 h-6" />
      </NavLink>
      <NavLink
        to={"/search"}
        className={({ isActive }) =>
          `p-3 rounded-2xl transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <FaSearch className="w-6 h-6" />
      </NavLink>
      <NavLink
        to={"/playlist"}
        className={({ isActive }) =>
          `p-3 rounded-2xl transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <RiPlayListFill className="w-6 h-6" />
      </NavLink>
      <NavLink
        to={"/like"}
        className={({ isActive }) =>
          `p-3 rounded-2xl transition-all duration-300 ${
            isActive
              ? "bg-rose-500/15 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-500/30 scale-105"
              : "text-white/60 hover:text-white"
          }`
        }
      >
        <FaHeart className="w-6 h-6" />
      </NavLink>
    </div>
  );
};

export default Navabar;
