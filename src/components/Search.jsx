import React, { useState, useEffect, useMemo } from "react";
import { songsData } from "../content";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMusicOff } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredSongs = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        song.singer.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [debouncedQuery]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 flex flex-col items-center pt-20 md:pt-28 px-4 md:px-12 pb-44 gap-8 text-white">
      <div className="w-full md:w-[60%] flex flex-col items-center gap-6">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-center">
          Search Your Favorite Tracks
        </h1>

        <div className="w-full relative flex items-center">
          <FaSearch className="absolute left-5 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by song name or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 px-14 py-4 rounded-2xl outline-none focus:border-rose-500 shadow-xl transition-all text-base md:text-lg backdrop-blur-md"
          />
          {isLoading && (
            <AiOutlineLoading3Quarters className="absolute right-5 text-rose-500 w-5 h-5 animate-spin" />
          )}
        </div>
      </div>

      <div className="w-full md:w-[65%] flex flex-col gap-4">
        {!query.trim() ? (
          <div className="flex flex-col items-center justify-center h-[40vh] gap-3 text-center bg-neutral-900/30 rounded-3xl border border-white/5 p-8">
            <FaSearch className="w-12 h-12 text-neutral-600 mb-2" />
            <h3 className="text-xl font-bold text-neutral-300">
              Discover Music
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              Type something in the search bar above to instantly find songs and
              artists.
            </p>
          </div>
        ) : filteredSongs.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-neutral-400 font-semibold text-xs uppercase tracking-wider px-2">
              Search Results ({filteredSongs.length})
            </h2>
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="bg-neutral-900/50 hover:bg-neutral-900/90 border border-white/5 p-2 rounded-2xl transition-all shadow-lg backdrop-blur-sm"
              >
                <Card
                  name={song.name}
                  image={song.image}
                  singer={song.singer}
                  songIndex={song.id - 1}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh] gap-3 text-center bg-neutral-900/30 rounded-3xl border border-white/5 p-8">
            <MdOutlineMusicOff className="w-14 h-14 text-neutral-600 mb-2" />
            <h3 className="text-xl font-bold text-neutral-300">
              No Songs Found
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              We couldn't find anything matching "{query}". Try searching for
              another track or artist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
