import React, { useContext } from "react";
import { datacontext } from "../context/UserContext";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { GiNextButton } from "react-icons/gi";
import { songsData } from "../content";

const Player = () => {
  let { playingsong, playsong, pausesong, nextsong, prevsong, index } =
    useContext(datacontext);

  if (!songsData || !songsData[index]) return null;

  return (
    <div className="w-[calc(100%-1rem)] md:w-[65%] h-16 md:h-20 bg-neutral-900/95 border border-white/10 fixed left-2 md:left-1/2 md:-translate-x-1/2 bottom-[4.5rem] md:bottom-3 rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex justify-between items-center px-3 sm:px-4 md:px-6 z-50 backdrop-blur-xl">
      {/* Song Info & Vinyl Artwork */}
      <div className="flex justify-start items-center gap-2 sm:gap-3 flex-1 min-w-0 md:w-[50%] h-full cursor-pointer">
        <div>
          <img
            src={songsData[index].image}
            alt=""
            className={`w-10 h-10 sm:w-12 sm:h-12 md:h-14 md:w-14 rounded-full object-cover shadow-md border border-white/10 transition-all ${
              playingsong ? "animate-spin [animation-duration:8s]" : ""
            }`}
          />
        </div>
        <div className="flex flex-col justify-center overflow-hidden">
          <div className="text-white text-xs sm:text-[14px] md:text-[16px] font-bold truncate max-w-[34vw] sm:max-w-[140px] md:max-w-[240px]">
            {songsData[index].name}
          </div>
          <div className="text-neutral-400 text-[10px] sm:text-[11px] md:text-[13px] font-medium truncate max-w-[34vw] sm:max-w-[140px] md:max-w-[240px]">
            {songsData[index].singer}
          </div>
        </div>
      </div>

      {/* Playback Controls (Previous, Play/Pause, Next) */}
      <div className="flex justify-end md:justify-center items-center gap-2 sm:gap-4 md:gap-6 shrink-0 md:w-[40%] h-full text-white">
        <MdOutlineSkipPrevious
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-neutral-300 hover:text-rose-500 transition-colors cursor-pointer"
          onClick={prevsong}
        />

        {!playingsong ? (
          <div
            onClick={() => playsong()}
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white flex justify-center items-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_4px_15px_rgba(244,63,94,0.4)]"
          >
            <FaPlay className="w-4 h-4 ml-0.5" />
          </div>
        ) : (
          <div
            onClick={() => pausesong()}
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white flex justify-center items-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_4px_15px_rgba(244,63,94,0.4)]"
          >
            <FaPause className="w-4 h-4" />
          </div>
        )}

        <GiNextButton
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-neutral-300 hover:text-rose-500 transition-colors cursor-pointer"
          onClick={nextsong}
        />
      </div>
    </div>
  );
};

export default Player;
