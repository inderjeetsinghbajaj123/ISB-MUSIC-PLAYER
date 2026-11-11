import React from "react";
import Player from "./Player";
import { useSelector } from "react-redux";
import Card from "./Card";

const Like = () => {
  let songs = useSelector((state) => state.liked);
  return (
    <div className="w-full h-dvh bg-black flex flex-col justify-start pt-5 md:pt-25 pb-36 items-center gap-5 md:gap-8 overflow-hidden">
      <Player />

      {songs.length > 0 ? (
        <>
          <h1 className="text-white font-semibold text-xl">Liked Songs</h1>
          <div className="w-full flex-1 min-h-0 overflow-auto px-3 sm:px-5 flex flex-col justify-start items-center gap-3 sm:gap-5">
            {songs.map((song) => (
              <Card
                key={song.songIndex}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.songIndex}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center text-center px-5 text-gray-500 text-xl sm:text-2xl font-semibold">
          No Liked Songs
        </div>
      )}
    </div>
  );
};

export default Like;
