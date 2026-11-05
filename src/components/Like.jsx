import React from "react";
import Player from "./Player";
import { useSelector } from "react-redux";
import Card from "./Card";

const Like = () => {
  const songs = useSelector((state) => state.liked);

  return (
    <div className="relative min-h-screen w-full bg-[#F3EFE5] text-[#263C32] px-5 md:px-9 lg:px-12 pt-8 pb-36 overflow-x-hidden">
      <Player />

      <header className="mb-12">
        <p className="text-[#C46B48] text-[10px] font-bold uppercase tracking-[2.5px] mb-3">
          YOUR PERSONAL SOUNDTRACK
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The songs you love.
            </h1>

            <p className="text-sm text-[#929083] mt-3">
              All the tracks that have found a place in your heart.
            </p>
          </div>

          <span className="text-xs text-[#999487]">
            {songs.length} {songs.length === 1 ? "song" : "songs"}
          </span>
        </div>
      </header>

      <section>
        <div className="mb-6">
          <p className="text-[#9C988B] text-[10px] font-bold uppercase tracking-[2px] mb-2">
            YOUR COLLECTION
          </p>

          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Favourite songs
          </h2>
        </div>

        {songs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {songs.map((song, index) => (
              <div
                key={`${song.songIndex}-${index}`}
                className="bg-[#EAE6DB] border border-[#DED8CB] rounded-2xl p-3 md:p-4 transition-all duration-300 hover:bg-[#E5DED0] hover:shadow-md"
              >
                <Card
                  name={song.name}
                  image={song.image}
                  singer={song.singer}
                  songIndex={song.songIndex}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[320px] rounded-3xl border border-[#DED8CB] bg-[#EAE6DB] flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-[#DCD5C6] flex items-center justify-center mb-5">
              <span className="text-2xl text-[#C46B48]">♥</span>
            </div>

            <h3
              className="text-2xl font-bold text-[#263C32]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Nothing here just yet.
            </h3>

            <p className="text-sm text-[#929083] mt-3 max-w-sm leading-relaxed">
              When you find a song you love, add it to your favourites and it
              will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Like;
