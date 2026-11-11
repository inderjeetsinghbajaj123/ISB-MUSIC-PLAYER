import React, { useContext } from "react";
import { MdPlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { datacontext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AddSong, RemoveSong } from "../redux/PlaylistSlice";
import { AddLiked, RemoveLiked } from "../redux/LikedSlice";

const Card = ({ name, image, singer, songIndex }) => {
  let { playsong, index, setindex } = useContext(datacontext);
  let dispatch = useDispatch();
  let sng = useSelector((state) => state.playlist);
  const songalreadyexist = sng.some((song) => song.songIndex === songIndex);
  let likedsng = useSelector((state) => state.liked);
  const songalreadyliked = likedsng.some(
    (song) => song.songIndex === songIndex,
  );

  const isCurrentPlaying = index === songIndex;

  return (
    <div
      className={`w-full min-w-0 min-h-18 sm:min-h-20 md:min-h-24 rounded-2xl px-2.5 sm:px-4 py-2 flex justify-between items-center gap-2 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.04] backdrop-blur-xl border ${
        isCurrentPlaying
          ? "border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.35)] bg-white/[0.08]"
          : "border-white/10 hover:border-rose-500/50 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]"
      }`}
    >
      <div
        className="flex justify-start items-center gap-2.5 sm:gap-4 flex-1 min-w-0 h-full cursor-pointer group"
        onClick={() => {
          setindex(songIndex);
          playsong();
        }}
      >
        <div className="relative rounded-xl overflow-hidden flex-shrink-0 w-12 h-12 md:w-16 md:h-16 shadow-lg border border-white/10">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isCurrentPlaying && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center truncate min-w-0 pr-1 sm:pr-2">
          <div
            className={`text-sm md:text-base font-bold truncate transition-colors ${isCurrentPlaying ? "text-rose-400" : "text-white group-hover:text-rose-400"}`}
          >
            {name}
          </div>
          <div className="text-gray-400 text-xs md:text-sm font-medium truncate mt-0.5">
            {singer}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-1 sm:gap-2 md:gap-3 shrink-0 h-full text-white/70">
        {!songalreadyexist ? (
          <button
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 hover:text-white transition-all cursor-pointer shadow-sm"
            onClick={() => {
              dispatch(AddSong({ name, image, singer, songIndex }));
            }}
            title="Add to Playlist"
          >
            <MdPlaylistAdd className="text-lg md:text-xl" />
          </button>
        ) : (
          <button
            className="p-2 sm:p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer shadow-sm"
            onClick={() => {
              dispatch(RemoveSong(songIndex));
            }}
            title="Remove from Playlist"
          >
            <MdOutlinePlaylistRemove className="text-lg md:text-xl" />
          </button>
        )}

        {!songalreadyliked ? (
          <button
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 hover:text-rose-400 transition-all cursor-pointer shadow-sm"
            onClick={() => {
              dispatch(AddLiked({ name, image, singer, songIndex }));
            }}
            title="Like Song"
          >
            <IoHeartOutline className="text-base md:text-lg" />
          </button>
        ) : (
          <button
            className="p-2 sm:p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500/20 transition-all cursor-pointer shadow-sm"
            onClick={() => {
              dispatch(RemoveLiked(songIndex));
            }}
            title="Unlike Song"
          >
            <IoHeartSharp className="text-base md:text-lg drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
