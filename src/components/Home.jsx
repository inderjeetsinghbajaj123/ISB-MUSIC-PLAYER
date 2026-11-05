import React, { useContext, useEffect, useState } from "react";
import { songsData } from "../content";
import "../App.css";
import { datacontext } from "../context/UserContext";

import {
  FaPlay,
  FaPause,
  FaSearch,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart as FaHeartSolid,
  FaHeadphones,
  FaArrowRight,
} from "react-icons/fa";

import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AddLiked, RemoveLiked } from "../redux/LikedSlice";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
};

const Home = () => {
  const {
    nextsong,
    prevsong,
    audioRef,
    playingsong,
    playsong,
    pausesong,
    index,
    setindex,
  } = useContext(datacontext);

  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.liked);

  const [range, setRange] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("0:00");
  const [durationFormatted, setDurationFormatted] = useState("0:00");
  const [searchQuery, setSearchQuery] = useState("");

  const currentSong = songsData[index] || songsData[0];

  const isLiked = likedSongs.some((song) => song.songIndex === index);

  const filteredSongs = songsData.filter((song) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      song.name.toLowerCase().includes(query) ||
      song.singer.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      const duration = audio.duration || 0;
      const currentTime = audio.currentTime || 0;

      setRange(duration > 0 ? (currentTime / duration) * 100 : 0);

      setCurrentTimeFormatted(formatTime(currentTime));
      setDurationFormatted(formatTime(duration));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("durationchange", updateProgress);

    updateProgress();

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("durationchange", updateProgress);
    };
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isRepeat;
    }
  }, [isRepeat, audioRef]);

  const handleSeek = (e) => {
    const value = Number(e.target.value);

    setRange(value);

    const audio = audioRef.current;

    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = (audio.duration * value) / 100;
    }
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);

    setVolume(value);
    setIsMuted(value === 0);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      const restoredVolume = volume > 0 ? volume : 0.5;

      audio.volume = restoredVolume;
      setVolume(restoredVolume);
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleNext = () => {
    if (isShuffle && songsData.length > 1) {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * songsData.length);
      } while (randomIndex === index);

      setindex(randomIndex);
      playsong();
    } else {
      nextsong();
    }
  };

  const handleSongSelect = (song) => {
    const songIndex = songsData.findIndex((item) => item.id === song.id);

    if (songIndex !== -1) {
      setindex(songIndex);
      playsong();
    }
  };

  const toggleLike = () => {
    if (isLiked) {
      dispatch(RemoveLiked(index));
    } else {
      dispatch(
        AddLiked({
          name: currentSong.name,
          image: currentSong.image,
          singer: currentSong.singer,
          songIndex: index,
        }),
      );
    }
  };

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-[#F3EFE5] text-[#263C32] flex items-center justify-center">
        No songs available.
      </div>
    );
  }

  return (
    <main className="relative w-full min-h-screen bg-[#F3EFE5] text-[#263C32] overflow-x-hidden px-5 md:px-9 lg:px-12 pt-7 pb-36">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-12">
        <div>
          <p className="text-[#C46B48] text-[10px] font-bold tracking-[2.5px] uppercase mb-2">
            YOUR MUSIC JOURNEY
          </p>

          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A good day starts with <br className="sm:hidden" />
            <span className="italic text-[#C46B48]">good music.</span>
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999487] text-xs" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a song or artist..."
            className="w-full bg-[#EAE6DB] border border-[#DED9CD] rounded-full py-3 pl-10 pr-4 text-xs text-[#263C32] placeholder:text-[#A09C90] outline-none focus:border-[#C46B48] transition-all"
          />
        </div>
      </header>

      {!searchQuery && (
        <section className="mb-14">
          <div className="flex justify-between items-end mb-5">
            <div>
              <p className="text-[#9C988B] text-[10px] font-bold uppercase tracking-[2px] mb-2">
                HANDPICKED FOR YOU
              </p>

              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                On the record
              </h2>
            </div>

            <span className="text-[#9C988B] text-[10px] uppercase tracking-wider">
              FEATURED MUSIC
            </span>
          </div>

          <div className="relative bg-[#263C32] rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center gap-7 md:gap-10 p-6 md:p-9 shadow-[0_12px_35px_rgba(38,60,50,0.12)]">
            <div className="w-full max-w-[260px] md:w-[260px] flex-shrink-0">
              <div className="aspect-square rounded-xl overflow-hidden shadow-xl">
                <img
                  src={currentSong.image}
                  alt={currentSong.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#D58B68]" />

                <span className="text-[#D9B19B] text-[10px] font-bold tracking-[2px] uppercase">
                  Featured listening
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl font-bold text-[#F3EFE5] leading-tight break-words"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {currentSong.name}
              </h2>

              <p className="text-[#C2C8BE] text-sm mt-3">
                {currentSong.singer}
              </p>

              <p className="text-[#AEB8AA] text-xs leading-relaxed max-w-sm mt-5">
                Some songs stay with you long after they've finished playing.
                Take a moment and enjoy this one.
              </p>

              <div className="flex items-center gap-3 mt-8 flex-wrap">
                <button
                  onClick={() => (playingsong ? pausesong() : playsong())}
                  className="flex items-center gap-3 bg-[#E8D9C7] hover:bg-white text-[#263C32] rounded-full px-6 py-3 font-bold text-xs transition-colors"
                >
                  {playingsong ? <FaPause /> : <FaPlay />}
                  {playingsong ? "Pause" : "Listen now"}
                </button>

                <button
                  onClick={toggleLike}
                  className={`w-11 h-11 rounded-full border border-white/20 flex items-center justify-center transition-colors ${
                    isLiked
                      ? "text-[#E3A080] bg-white/10"
                      : "text-[#F3EFE5] hover:text-[#E3A080]"
                  }`}
                  aria-label="Like song"
                >
                  {isLiked ? (
                    <FaHeartSolid />
                  ) : (
                    <IoHeartOutline className="text-xl" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="text-[#D4D7D0] text-xs hover:text-white transition-colors flex items-center gap-2"
                >
                  Next track
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mb-12">
        <div className="flex justify-between items-end mb-7">
          <div>
            <p className="text-[#9C988B] text-[10px] font-bold uppercase tracking-[2px] mb-2">
              THE LISTENING ROOM
            </p>

            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {searchQuery ? "Found for you" : "Songs worth playing"}
            </h2>
          </div>

          <span className="text-[#A09C90] text-[11px]">
            {filteredSongs.length} tracks
          </span>
        </div>

        {filteredSongs.length === 0 ? (
          <div className="py-16 text-center border border-[#DED9CD] rounded-2xl bg-[#EAE6DB]">
            <FaSearch className="text-[#B0AA9D] text-2xl mx-auto mb-4" />

            <p className="text-[#263C32] font-bold text-sm">
              Nothing on this record.
            </p>

            <p className="text-[#969184] text-xs mt-2">
              Try another song or artist.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
            {filteredSongs.map((song) => {
              const songIndex = songsData.findIndex(
                (item) => item.id === song.id,
              );

              const isCurrentPlaying = index === songIndex;

              const songIsLiked = likedSongs.some(
                (item) => item.songIndex === songIndex,
              );

              return (
                <article
                  key={song.id}
                  onClick={() => handleSongSelect(song)}
                  className="group min-w-0 cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#E3DED1] shadow-[0_5px_15px_rgba(38,60,50,0.06)]">
                    <img
                      src={song.image}
                      alt={song.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-[#263C32]/0 group-hover:bg-[#263C32]/25 transition-colors duration-300" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSongSelect(song);
                      }}
                      aria-label={`Play ${song.name}`}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#F3EFE5] text-[#263C32] flex items-center justify-center shadow-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C46B48] hover:text-white"
                    >
                      {isCurrentPlaying && playingsong ? (
                        <FaPause className="text-xs" />
                      ) : (
                        <FaPlay className="text-xs ml-0.5" />
                      )}
                    </button>

                    {songIsLiked && (
                      <div className="absolute top-3 right-3 text-white drop-shadow-md">
                        <FaHeartSolid className="text-sm" />
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <h3
                      className={`text-sm font-bold truncate transition-colors ${
                        isCurrentPlaying
                          ? "text-[#C46B48]"
                          : "text-[#263C32] group-hover:text-[#C46B48]"
                      }`}
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {song.name}
                    </h3>

                    <p className="text-[#999487] text-[11px] mt-1 truncate">
                      {song.singer}
                    </p>

                    {isCurrentPlaying && playingsong && (
                      <p className="text-[#C46B48] text-[9px] uppercase tracking-wider font-bold mt-2">
                        Now playing
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <div className="fixed bottom-3 left-3 right-3 md:left-[262px] z-50 rounded-xl bg-[#263C32] text-[#F3EFE5] shadow-[0_8px_30px_rgba(38,60,50,0.25)] px-3 md:px-5 py-3">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
          <div className="flex items-center gap-3 w-full md:w-[25%] min-w-0">
            <img
              src={currentSong.image}
              alt={currentSong.name}
              className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
            />

            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold truncate text-[#F3EFE5]">
                {currentSong.name}
              </span>

              <span className="text-[10px] text-[#B8C1B5] truncate mt-1">
                {currentSong.singer}
              </span>
            </div>

            <button
              onClick={toggleLike}
              aria-label="Like current song"
              className={`text-base ${
                isLiked
                  ? "text-[#E4A080]"
                  : "text-[#B8C1B5] hover:text-[#E4A080]"
              }`}
            >
              {isLiked ? <FaHeartSolid /> : <IoHeartOutline />}
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 w-full md:w-[50%] max-w-xl">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setIsShuffle((prev) => !prev)}
                className={`text-xs ${
                  isShuffle
                    ? "text-[#E4A080]"
                    : "text-[#B8C1B5] hover:text-white"
                }`}
                title="Shuffle"
                aria-label="Toggle shuffle"
              >
                <FaRandom />
              </button>

              <button
                onClick={prevsong}
                className="text-[#B8C1B5] hover:text-white transition-colors"
                aria-label="Previous track"
              >
                <MdOutlineSkipPrevious className="text-2xl" />
              </button>

              <button
                onClick={() => (playingsong ? pausesong() : playsong())}
                className="w-10 h-10 rounded-full bg-[#F3EFE5] text-[#263C32] flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
                aria-label={playingsong ? "Pause" : "Play"}
              >
                {playingsong ? (
                  <FaPause className="text-xs" />
                ) : (
                  <FaPlay className="text-xs ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="text-[#B8C1B5] hover:text-white transition-colors"
                aria-label="Next track"
              >
                <MdOutlineSkipNext className="text-2xl" />
              </button>

              <button
                onClick={() => setIsRepeat((prev) => !prev)}
                className={`text-xs ${
                  isRepeat
                    ? "text-[#E4A080]"
                    : "text-[#B8C1B5] hover:text-white"
                }`}
                title="Repeat"
                aria-label="Toggle repeat"
              >
                <FaRedo />
              </button>
            </div>

            <div className="w-full flex items-center gap-3">
              <span className="text-[9px] text-[#B8C1B5] tabular-nums">
                {currentTimeFormatted}
              </span>

              <input
                id="range"
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={range}
                onChange={handleSeek}
                aria-label="Track progress"
                className="w-full h-1 accent-[#D58B68] cursor-pointer"
              />

              <span className="text-[9px] text-[#B8C1B5] tabular-nums">
                {durationFormatted}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-3 w-[25%]">
            <FaHeadphones className="text-[#B8C1B5] text-sm" />

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-[#B8C1B5] hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <FaVolumeMute className="text-sm" />
              ) : (
                <FaVolumeUp className="text-sm" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="w-20 accent-[#D58B68] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
