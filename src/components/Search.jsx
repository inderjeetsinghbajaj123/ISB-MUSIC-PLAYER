import React, { useEffect, useState } from "react";
import Player from "./Player";
import { FaSearch, FaTimes } from "react-icons/fa";
import { songsData } from "../content";
import Card from "./Card";

const Search = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const query = input.toLowerCase().trim();

    const filtered = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) ||
        song.singer.toLowerCase().includes(query),
    );

    setList(filtered);
  }, [input]);

  return (
    <div className="relative min-h-screen w-full bg-[#F3EFE5] text-[#263C32] px-5 md:px-9 lg:px-12 pt-8 pb-36 overflow-x-hidden">
      <Player />

      <header className="mb-12">
        <p className="text-[#C46B48] text-[10px] font-bold uppercase tracking-[2.5px] mb-3">
          FIND YOUR NEXT FAVOURITE
        </p>

        <h1
          className="text-3xl md:text-5xl font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Explore the sound.
        </h1>

        <p className="text-sm text-[#929083] mt-3">
          Search your favourite songs and artists.
        </p>
      </header>

      <section className="mb-12">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-2xl h-14 bg-[#EAE6DB] border border-[#DED8CB] rounded-2xl flex items-center gap-4 px-5 focus-within:border-[#C46B48] transition-colors"
        >
          <FaSearch className="text-[#999487] text-base flex-shrink-0" />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search songs, artists..."
            className="flex-1 min-w-0 bg-transparent outline-none border-none text-sm text-[#263C32] placeholder:text-[#A09C90]"
          />

          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="text-[#999487] hover:text-[#C46B48] transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </form>
      </section>

      <section>
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-[#9C988B] text-[10px] font-bold uppercase tracking-[2px] mb-2">
              THE MUSIC LIBRARY
            </p>

            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {input ? "Search results" : "Discover music"}
            </h2>
          </div>

          {input && (
            <span className="text-xs text-[#999487]">
              {list.length} {list.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        {!input ? (
          <div className="rounded-3xl bg-[#263C32] p-7 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-[#D9A184] text-[10px] font-bold uppercase tracking-[2px] mb-3">
                A WORLD OF MUSIC
              </p>

              <h3
                className="text-2xl md:text-3xl text-[#F3EFE5] font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What are you in the mood for?
              </h3>

              <p className="text-sm text-[#B8C1B5] mt-3 max-w-md">
                Find a song that matches your moment. Search by track name or
                artist to get started.
              </p>
            </div>

            <div className="text-5xl text-[#D58B68] opacity-80">♫</div>
          </div>
        ) : list.length > 0 ? (
          <div className="flex flex-col gap-4">
            {list.map((song) => {
              const songIndex = songsData.findIndex(
                (item) => item.id === song.id,
              );

              return (
                <div
                  key={song.id}
                  className="bg-[#EAE6DB] border border-[#DED8CB] rounded-2xl p-3 md:p-4 transition-all duration-300 hover:bg-[#E5DED0] hover:shadow-md"
                >
                  <Card
                    name={song.name}
                    image={song.image}
                    singer={song.singer}
                    songIndex={songIndex}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="min-h-[300px] rounded-3xl border border-[#DED8CB] bg-[#EAE6DB] flex flex-col items-center justify-center text-center px-6">
            <FaSearch className="text-3xl text-[#B0AA9D] mb-5" />

            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              No songs found.
            </h3>

            <p className="text-sm text-[#929083] mt-3">
              Try searching with a different song or artist name.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;
