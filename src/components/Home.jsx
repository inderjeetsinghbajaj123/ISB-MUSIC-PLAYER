import React, { useContext, useEffect, useRef, useState } from "react";
import { songsData } from "../content";
import "../App.css";
import gif from "../assets/gif.gif";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { GiNextButton } from "react-icons/gi";
import { datacontext } from "../context/UserContext";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import Card from "./Card";
import Player from "./Player";

const Home = () => {
  let {
    nextsong,
    prevsong,
    audioRef,
    playingsong,
    playsong,
    pausesong,
    index,
    setindex,
  } = useContext(datacontext);
  const [range, setrange] = useState(0);
  let progress = useRef(0);

  useEffect(() => {
    const updateprg = () => {
      let duration = audioRef.current.duration || 0;
      let currentTime = audioRef.current.currentTime || 0;
      let progressPer = (currentTime / duration) * 100 || 0;
      setrange(progressPer);
      if (progress.current) {
        progress.current.style.width = `${progressPer}%`;
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateprg);
    }
  }, [audioRef]);

  const [arrow, setarrow] = useState(false);

  function handrg(e) {
    let nextrange = e.target.value;
    setrange(nextrange);
    let duration = audioRef.current.duration;
    audioRef.current.currentTime = (duration * nextrange) / 100;
  }

  return (
    <div className="w-full h-screen bg-black flex relative overflow-hidden">
      <FaCaretDown
        className={`absolute text-white top-5.5 left-[1%] text-[30px] md:hidden cursor-pointer z-40 transition-transform ${arrow ? "-rotate-90" : ""}`}
        onClick={() => setarrow((prev) => !prev)}
      />
      {!arrow ? (
        <>
          <div className="md:w-1/2 w-full h-full pt-5 md:pt-30 flex flex-col justify-start items-center gap-6 ">
            <h1 className="text-white font-bold text-[20px]">
              Made with ❤️ by INDERJEET
            </h1>

            {/* Rotating Vinyl Record Artwork */}
            <div className="w-[80%] max-w-62.5 h-62.5 object-fill relative rounded-full overflow-hidden shadow-2xl">
              <img
                src={songsData[index].image}
                alt=""
                className={`w-full h-full object-cover transition-all ${
                  playingsong ? "animate-spin [animation-duration:8s]" : ""
                }`}
              />
              {playingsong ? (
                <div className="w-full h-full bg-black absolute top-0 opacity-[0.3] rounded-full flex justify-center items-center pointer-events-none">
                  <img src={gif} alt="" className="w-[40%] " />
                </div>
              ) : (
                ""
              )}
            </div>

            <div>
              <div className="text-white text-[30px] font-bold text-center">
                {songsData[index].name}
              </div>
              <div className="text-gray-300 text-[18px] text-center">
                {songsData[index].singer}
              </div>
            </div>

            {/* Custom Styled Audio Range Slider matching Player bar */}
            <div className="w-1/2 flex justify-center items-center relative rounded-md">
              <input
                type="range"
                className="appearance-none w-full h-1.75 rounded-md bg-zinc-700 accent-white cursor-pointer"
                value={range}
                id="range"
                onChange={handrg}
              />
              <div
                className={`bg-white h-full absolute left-0 rounded-md pointer-events-none`}
                ref={progress}
              ></div>
            </div>

            <div className="text-white flex justify-center items-center gap-5 ">
              <MdOutlineSkipPrevious
                className="w-7 h-7 hover:text-zinc-400 cursor-pointer transition-colors"
                onClick={prevsong}
              />
              {!playingsong ? (
                <div className="w-12.5 h-12.5 rounded-full bg-white text-black flex justify-center items-center hover:bg-zinc-200 transition-all cursor-pointer shadow-lg">
                  <FaPlay
                    className="w-5 h-5 ml-0.5"
                    onClick={() => playsong()}
                  />
                </div>
              ) : (
                <div className="w-12.5 h-12.5 rounded-full bg-white text-black flex justify-center items-center hover:bg-zinc-200 transition-all cursor-pointer shadow-lg">
                  <FaPause className="w-5 h-5" onClick={() => pausesong()} />
                </div>
              )}
              <GiNextButton
                className="w-7 h-7 hover:text-zinc-400 cursor-pointer transition-colors"
                onClick={nextsong}
              />
            </div>
          </div>

          {/* Desktop Song List */}
          <div className="hidden md:flex flex-col gap-4 w-full md:w-1/2 h-full pt-28 px-4 overflow-auto pb-32">
            {songsData.map((song) => (
              <Card
                key={song.id}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.id - 1}
              />
            ))}
          </div>
        </>
      ) : (
        /* Mobile Expanded View matching clean white mini-player bar design */
        <div className="flex items-center flex-col gap-4 w-full md:w-[50%] mt-12 overflow-auto pb-36 h-[85%] relative px-3">
          <div className="w-full bg-white text-black rounded-3xl p-4 shadow-2xl flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <img
                src={songsData[index].image}
                alt=""
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div>
                <div className="font-bold text-base text-black truncate max-w-[150px]">
                  {songsData[index].name}
                </div>
                <div className="text-xs text-zinc-600 truncate max-w-[150px]">
                  {songsData[index].singer}
                </div>
              </div>
            </div>
            {!playingsong ? (
              <div
                onClick={() => playsong()}
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
              >
                <FaPlay className="w-4 h-4 ml-0.5" />
              </div>
            ) : (
              <div
                onClick={() => pausesong()}
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
              >
                <FaPause className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-3">
            {songsData.map((song) => (
              <Card
                key={song.id}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.id - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
