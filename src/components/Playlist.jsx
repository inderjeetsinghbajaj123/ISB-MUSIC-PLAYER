import React, { useState, useEffect } from "react";
import Player from "./Player";
import { useSelector } from "react-redux";
import Card from "./Card";
import {
  MdDelete,
  MdAdd,
  MdClose,
  MdFolderSpecial,
  MdMusicNote,
} from "react-icons/md";

const Playlist = () => {
  let songs = useSelector((state) => state.playlist);

  const [customPlaylists, setCustomPlaylists] = useState(() => {
    const saved = localStorage.getItem("customPlaylists");
    return saved ? JSON.parse(saved) : [];
  });

  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [isCreatingModal, setIsCreatingModal] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [songToAssign, setSongToAssign] = useState(null);

  useEffect(() => {
    localStorage.setItem("customPlaylists", JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (!newPlaylistTitle.trim()) return;
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistTitle,
      tracks: [],
    };
    setCustomPlaylists((prev) => [...prev, newPlaylist]);
    setNewPlaylistTitle("");
    setIsCreatingModal(false);
  };

  const handleDeletePlaylist = (id) => {
    setCustomPlaylists((prev) => prev.filter((p) => p.id !== id));
    if (selectedPlaylistId === id) setSelectedPlaylistId(null);
  };

  const handleAddSongToPlaylist = (playlistId) => {
    if (!songToAssign) return;
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          if (!p.tracks.some((t) => t.songIndex === songToAssign.songIndex)) {
            return { ...p, tracks: [...p.tracks, songToAssign] };
          }
        }
        return p;
      }),
    );
    setSongToAssign(null);
  };

  const activePlaylist = customPlaylists.find(
    (p) => p.id === selectedPlaylistId,
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 flex flex-col justify-start pt-6 md:pt-28 items-center gap-8 overflow-auto pb-48 text-white">
      <Player />

      <div className="w-[92%] md:w-[70%] flex flex-col items-center gap-8">
        {/* Glassmorphism Header Bar */}
        <div className="w-full flex justify-between items-center bg-white/[0.03] border border-white/10 px-6 py-5 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 shadow-inner">
              <MdFolderSpecial className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-wide">
                My Library
              </h1>
              <p className="text-xs text-neutral-400">
                Organize and curate your playlists
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreatingModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:scale-[1.02] active:scale-95"
          >
            <MdAdd className="w-5 h-5" /> New Playlist
          </button>
        </div>

        {/* Floating Modal / Creator Box */}
        {isCreatingModal && (
          <div className="w-full bg-neutral-900/90 border border-rose-500/30 p-6 rounded-3xl flex flex-col gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold text-lg">
                Create New Playlist Folder
              </h2>
              <button
                onClick={() => setIsCreatingModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-xl bg-white/5 cursor-pointer"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={handleCreatePlaylist}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="Enter playlist name..."
                value={newPlaylistTitle}
                onChange={(e) => setNewPlaylistTitle(e.target.value)}
                autoFocus
                className="flex-1 bg-black/50 text-white px-5 py-3.5 rounded-2xl border border-white/10 outline-none focus:border-rose-500 transition-all text-sm shadow-inner"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all cursor-pointer shadow-lg text-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingModal(false)}
                  className="bg-white/5 hover:bg-white/10 text-neutral-300 px-5 py-3.5 rounded-2xl transition-all cursor-pointer text-sm border border-white/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Song Assignment Panel */}
        {songToAssign && customPlaylists.length > 0 && (
          <div className="w-full bg-rose-950/20 border border-rose-500/40 p-6 rounded-3xl flex flex-col gap-4 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium text-sm">
                Add{" "}
                <span className="text-rose-400 font-bold">
                  "{songToAssign.name}"
                </span>{" "}
                to playlist:
              </h3>
              <button
                onClick={() => setSongToAssign(null)}
                className="text-neutral-400 hover:text-white cursor-pointer bg-black/40 p-1.5 rounded-xl border border-white/5"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {customPlaylists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handleAddSongToPlaylist(playlist.id)}
                  className="bg-neutral-900/90 hover:bg-rose-500 hover:text-white text-neutral-200 px-4 py-3 rounded-2xl text-sm font-semibold transition-all border border-white/10 cursor-pointer flex items-center gap-2 shadow-md"
                >
                  📁 {playlist.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Playlists List Grid */}
        {customPlaylists.length > 0 && (
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-neutral-400 font-semibold text-xs uppercase tracking-wider px-2">
              Your Playlists
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {customPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className={`w-full bg-neutral-900/40 hover:bg-neutral-900/80 border p-5 rounded-3xl flex justify-between items-center shadow-lg transition-all backdrop-blur-md ${
                    selectedPlaylistId === playlist.id
                      ? "border-rose-500 bg-neutral-900 ring-2 ring-rose-500/20"
                      : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <div
                    onClick={() =>
                      setSelectedPlaylistId(
                        selectedPlaylistId === playlist.id ? null : playlist.id,
                      )
                    }
                    className="cursor-pointer flex-1 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xl font-bold">
                      📁
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base tracking-wide hover:text-rose-400 transition-colors">
                        {playlist.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {playlist.tracks.length} songs saved • Click to expand
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer border border-red-500/20 shadow-sm"
                    title="Delete Playlist"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Playlist Expanded Detailed View */}
        {selectedPlaylistId !== null && activePlaylist && (
          <div className="w-full bg-neutral-900/80 border border-rose-500/40 p-6 rounded-3xl flex flex-col gap-5 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500 text-white font-bold text-lg">
                  📁
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">
                    {activePlaylist.name}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {activePlaylist.tracks.length} tracks inside folder
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlaylistId(null)}
                className="text-neutral-400 hover:text-white p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-white/5"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            {activePlaylist.tracks.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activePlaylist.tracks.map((song) => (
                  <div
                    key={song.songIndex}
                    className="bg-black/40 border border-white/5 p-2 rounded-2xl"
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
              <div className="text-neutral-500 text-sm py-10 text-center bg-black/30 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                <MdMusicNote className="w-8 h-8 text-neutral-600" />
                No tracks in this playlist yet. Add songs from your queue below!
              </div>
            )}
          </div>
        )}

        {/* Queued Songs Section */}
        <div className="w-full flex flex-col justify-start items-center gap-4 mt-2">
          <div className="w-full flex justify-between items-center px-2">
            <h2 className="text-neutral-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
              <MdMusicNote className="w-4 h-4 text-rose-500" /> Queued Songs
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">
              {songs ? songs.length : 0} tracks
            </span>
          </div>

          {songs && songs.length > 0 ? (
            <div className="w-full flex flex-col gap-3">
              {songs.map((song) => (
                <div
                  key={song.songIndex}
                  className="w-full flex justify-between items-center bg-neutral-900/40 hover:bg-neutral-900/70 border border-white/5 p-3 rounded-3xl shadow-lg transition-all gap-4 backdrop-blur-sm"
                >
                  <div className="flex-1">
                    <Card
                      name={song.name}
                      image={song.image}
                      singer={song.singer}
                      songIndex={song.songIndex}
                    />
                  </div>
                  {customPlaylists.length > 0 && (
                    <button
                      onClick={() => setSongToAssign(song)}
                      className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-sm flex items-center gap-1.5"
                    >
                      <MdAdd className="w-4 h-4" /> Add to Playlist
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[32vh] gap-3 text-center bg-neutral-900/20 w-full rounded-3xl border border-white/5 p-8 backdrop-blur-sm">
              <div className="p-4 rounded-3xl bg-white/5 text-neutral-400">
                <MdMusicNote className="w-8 h-8" />
              </div>
              <div className="text-white text-lg font-semibold tracking-wide">
                No Songs Added
              </div>
              <p className="text-neutral-400 text-xs max-w-xs leading-relaxed">
                Your queue is empty. Explore and add your favorite tracks to
                start listening!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
