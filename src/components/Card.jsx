import React, { useContext } from "react";
import { MdPlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { datacontext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";

import { AddSong, RemoveSong } from "../redux/PlaylistSlice";

import { AddLiked, RemoveLiked } from "../redux/LikedSlice";

const Card = ({ name, image, singer, songIndex }) => {
  const { playsong, index, setindex } = useContext(datacontext);

  const dispatch = useDispatch();

  // Redux playlist state
  const playlistSongs = useSelector((state) => state.playlist);

  // Redux liked songs state
  const likedSongs = useSelector((state) => state.liked);

  const songAlreadyExists = playlistSongs.some(
    (song) => song.songIndex === songIndex,
  );

  const songAlreadyLiked = likedSongs.some(
    (song) => song.songIndex === songIndex,
  );

  const isCurrentPlaying = index === songIndex;

  // Play selected song
  const handlePlay = () => {
    setindex(songIndex);
    playsong();
  };

  // Add / Remove playlist
  const handlePlaylist = (e) => {
    e.stopPropagation();

    if (songAlreadyExists) {
      dispatch(RemoveSong(songIndex));
    } else {
      dispatch(
        AddSong({
          name,
          image,
          singer,
          songIndex,
        }),
      );
    }
  };

  // Add / Remove liked song
  const handleLike = (e) => {
    e.stopPropagation();

    if (songAlreadyLiked) {
      dispatch(RemoveLiked(songIndex));
    } else {
      dispatch(
        AddLiked({
          name,
          image,
          singer,
          songIndex,
        }),
      );
    }
  };

  return (
    <div
      className={`w-full min-h-[76px] md:min-h-[92px] px-3 md:px-4 py-3 rounded-2xl flex justify-between items-center gap-3 border cursor-pointer transition-all duration-300 ${
        isCurrentPlaying
          ? "bg-[#263C32] border-[#263C32] shadow-md"
          : "bg-[#EAE6DB] border-[#DED8CB] hover:bg-[#E5DED0] hover:shadow-md"
      }`}
    >
      {/* Song information */}
      <div
        onClick={handlePlay}
        className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 h-full"
      >
        {/* Album image */}
        <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 md:w-16 md:h-16 object-cover"
          />

          {isCurrentPlaying && (
            <div className="absolute inset-0 bg-[#263C32]/45 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D58B68] animate-pulse" />
            </div>
          )}
        </div>

        {/* Song name and artist */}
        <div className="flex flex-col justify-center min-w-0">
          <h3
            className={`text-sm md:text-base font-bold truncate transition-colors ${
              isCurrentPlaying ? "text-[#F3EFE5]" : "text-[#263C32]"
            }`}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {name}
          </h3>

          <p
            className={`text-[11px] md:text-xs truncate mt-1 ${
              isCurrentPlaying ? "text-[#C2C8BE]" : "text-[#999487]"
            }`}
          >
            {singer}
          </p>

          {isCurrentPlaying && (
            <span className="text-[9px] uppercase tracking-wider font-bold text-[#D58B68] mt-1">
              Now playing
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-1 md:gap-3 flex-shrink-0">
        {/* Playlist button */}
        <button
          type="button"
          title={songAlreadyExists ? "Remove from playlist" : "Add to playlist"}
          aria-label={
            songAlreadyExists ? "Remove from playlist" : "Add to playlist"
          }
          onClick={handlePlaylist}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
            songAlreadyExists
              ? "text-[#D58B68] bg-[#D58B68]/10"
              : isCurrentPlaying
                ? "text-[#D9DCD4] hover:bg-white/10"
                : "text-[#858276] hover:bg-[#DCD5C6] hover:text-[#263C32]"
          }`}
        >
          {songAlreadyExists ? (
            <MdOutlinePlaylistRemove className="text-xl md:text-2xl" />
          ) : (
            <MdPlaylistAdd className="text-xl md:text-2xl" />
          )}
        </button>

        {/* Like button */}
        <button
          type="button"
          title={songAlreadyLiked ? "Unlike song" : "Like song"}
          aria-label={songAlreadyLiked ? "Unlike song" : "Like song"}
          onClick={handleLike}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
            songAlreadyLiked
              ? "text-[#D58B68] bg-[#D58B68]/10"
              : isCurrentPlaying
                ? "text-[#D9DCD4] hover:text-[#D58B68] hover:bg-white/10"
                : "text-[#858276] hover:text-[#C46B48] hover:bg-[#DCD5C6]"
          }`}
        >
          {songAlreadyLiked ? (
            <IoHeartSharp className="text-lg md:text-xl" />
          ) : (
            <IoHeartOutline className="text-lg md:text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
