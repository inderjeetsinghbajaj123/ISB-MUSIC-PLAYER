import React from "react";
import { NavLink } from "react-router-dom";

import { IoIosHome } from "react-icons/io";
import { FaCompass, FaMusic, FaHeart, FaExternalLinkAlt } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";

const Sidebar = () => {
  const menuItems = [
    { path: "/", title: "Home", icon: <IoIosHome /> },
    { path: "/search", title: "Explore Music", icon: <FaCompass /> },
  ];

  const libraryItems = [
    { path: "/playlist", title: "My Playlists", icon: <RiPlayListFill /> },
    { path: "/like", title: "Favourite Songs", icon: <FaHeart /> },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-[#263C32] text-[#F3EFE5] shadow-md"
        : "text-[#77776D] hover:bg-[#E8E2D6] hover:text-[#263C32]"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col border-r border-[#DED8CB] bg-[#F3EFE5] px-5 py-7">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#263C32] text-[#F3EFE5]">
            <FaMusic className="text-xl" />
          </div>

          <div>
            <h1
              className="text-2xl font-bold tracking-tight text-[#263C32]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              RhythmoTune
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#999486]">
              Feel every beat
            </p>
          </div>
        </div>
      </div>

      <div className="mb-9">
        <p className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A29B8E]">
          Discover
        </p>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClass}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-semibold">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <p className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A29B8E]">
          Your Collection
        </p>

        <nav className="flex flex-col gap-2">
          {libraryItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-semibold">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="relative mt-12 overflow-hidden rounded-2xl bg-[#E5DED0] p-5">
        <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-[#D4C7B2] opacity-50" />

        <div className="relative z-10">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#A16A4E]">
            A little reminder
          </p>

          <h3
            className="mb-3 text-xl leading-tight text-[#263C32]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Music makes ordinary moments special.
          </h3>

          <p className="mb-4 text-xs leading-relaxed text-[#77776D]">
            Find your rhythm, discover new sounds and enjoy every moment.
          </p>

          <NavLink
            to="/search"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#263C32] hover:text-[#C46B48]"
          >
            Explore now
            <FaExternalLinkAlt className="text-[10px]" />
          </NavLink>
        </div>
      </div>

      <div className="mt-auto border-t border-[#DED8CB] pt-5">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C46B48] text-sm font-bold text-white">
            R
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#263C32]">Robert</h4>
            <p className="text-xs text-[#999486]">Your personal space</p>
          </div>

          <FaMusic className="ml-auto text-sm text-[#C46B48]" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
