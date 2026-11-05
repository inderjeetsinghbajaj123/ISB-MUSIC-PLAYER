import React, { useContext } from "react";

import { datacontext } from "../context/UserContext";
import { songsData } from "../content";

import { FaPlay, FaPause } from "react-icons/fa";

const Player = () => {
  const { playingsong, playsong, pausesong, index } = useContext(datacontext);

  const currentSong = songsData[index] || songsData[0];

  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 md:left-[262px] z-50 min-h-[76px] md:min-h-[86px] bg-[#263C32] text-[#F3EFE5] rounded-xl shadow-[0_8px_30px_rgba(38,60,50,0.25)] px-3 md:px-5 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={currentSong.image}
            alt={currentSong.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3
            className="text-xs md:text-sm font-bold truncate text-[#F3EFE5]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {currentSong.name}
          </h3>

          <p className="text-[10px] md:text-xs text-[#B8C1B5] truncate mt-1">
            {currentSong.singer}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            if (playingsong) {
              pausesong();
            } else {
              playsong();
            }
          }}
          aria-label={playingsong ? "Pause song" : "Play song"}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F3EFE5] text-[#263C32] flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200"
        >
          {playingsong ? (
            <FaPause className="text-xs md:text-sm" />
          ) : (
            <FaPlay className="text-xs md:text-sm ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Player;
