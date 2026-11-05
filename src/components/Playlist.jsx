import React from "react";
import Player from "./Player";
import { useSelector } from "react-redux";
import Card from "./Card";

const Playlist = () => {
  const songs = useSelector((state) => state.playlist);

  return (
    <div className="relative min-h-screen w-full bg-[#F3EFE5] text-[#263C32] px-5 md:px-9 lg:px-12 pt-8 pb-36 overflow-x-hidden">
      {/* Player */}
      <Player />

      {/* Header */}
      <header className="mb-12">
        <p className="text-[#C46B48] text-[10px] font-bold uppercase tracking-[2.5px] mb-3">
          YOUR PERSONAL COLLECTION
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your playlists.
            </h1>

            <p className="text-sm text-[#929083] mt-3">
              Every song has a place. Keep your favourites together.
            </p>
          </div>

          <span className="text-xs text-[#999487]">
            {songs.length} {songs.length === 1 ? "track" : "tracks"}
          </span>
        </div>
      </header>

      {/* Playlist Content */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#A29B8E] mb-2">
              THE COLLECTION
            </p>

            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Saved for later
            </h2>
          </div>
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
              <span className="text-2xl">♫</span>
            </div>

            <h3
              className="text-2xl font-bold text-[#263C32]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your collection starts here.
            </h3>

            <p className="text-sm text-[#929083] mt-3 max-w-sm leading-relaxed">
              Add songs to your playlist and build a collection that feels like
              yours.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Playlist;
