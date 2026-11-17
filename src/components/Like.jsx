import React from "react";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import Card from "./Card";

const Like = () => {
  const likedSongs = useSelector((state) => state.liked || []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 flex flex-col items-center pt-20 md:pt-28 px-4 md:px-12 pb-44 gap-8 text-white">
      <div className="w-full md:w-[65%] flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          Liked Songs
        </h1>
        <p className="text-sm text-neutral-400">
          Your favorite tracks powered by Redux state management
        </p>
      </div>

      <div className="w-full md:w-[65%] flex flex-col gap-4">
        {likedSongs && likedSongs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {likedSongs.map((song) => (
              <Card
                key={song.songIndex}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.songIndex}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh] gap-3 text-center bg-neutral-900/30 rounded-3xl border border-white/5 p-8">
            <FaRegHeart className="w-12 h-12 text-neutral-600 mb-2" />
            <h3 className="text-xl font-bold text-neutral-300">
              No Liked Songs Yet
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              Explore music and tap the heart icon on any track to add it to
              your liked collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Like;
