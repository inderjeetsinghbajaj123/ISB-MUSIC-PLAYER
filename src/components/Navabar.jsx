import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navabar = () => {
  const navItems = [
    { path: "/", icon: <IoIosHome className="w-5 h-5" />, label: "Home" },
    {
      path: "/search",
      icon: <FaSearch className="w-4 h-4" />,
      label: "Search",
    },
    {
      path: "/playlist",
      icon: <RiPlayListFill className="w-5 h-5" />,
      label: "Playlist",
    },
    { path: "/like", icon: <FaHeart className="w-4 h-4" />, label: "Liked" },
  ];

  return (
    <div className="z-50 fixed bottom-4 md:top-4 md:bottom-auto left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 text-white flex justify-around items-center px-4 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className="relative group">
          {({ isActive }) => (
            <div
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.25)] border border-white/30"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Navabar;
