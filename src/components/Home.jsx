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
    audioRef.current.addEventListener("timeupdate", updateprg);
  });

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
        className={`absolute text-white top-5.5 left-[1%] text-[30px] md:hidden cursor-pointer ${arrow ? "-rotate-90" : ""}`}
        onClick={() => setarrow((prev) => !prev)}
      />
      {!arrow ? (
        <>
          <div className="md:w-1/2 w-full h-full pt-5 md:pt-30 flex flex-col justify-start items-center gap-6 ">
            <h1 className="text-white font-bold text-[20px]">
              {" "}
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
            <div className="w-1/2 flex justify-center items-center relative rounded-md">
              <input
                type="range"
                className="appearance-none w-full h-1.75 rounded-md bg-gray-600 "
                value={range}
                id="range"
                onChange={handrg}
              />
              <div
                className={`bg-white h-full absolute left-0 rounded-md`}
                ref={progress}
              ></div>
            </div>

            <div className="text-white flex justify-center items-center gap-5 ">
              <MdOutlineSkipPrevious
                className="w-7 h-7 hover:text-gray-600 cursor-pointer"
                onClick={prevsong}
              />
              {!playingsong ? (
                <div className="w-12.5 h-12.5 rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer">
                  <FaPlay className="w-5 h-7 " onClick={() => playsong()} />
                </div>
              ) : (
                <div className="w-12.5 h-12.5 rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer">
                  <FaPause className="w-5 h-7 " onClick={() => pausesong()} />
                </div>
              )}
              <GiNextButton
                className="w-7 h-7 hover:text-gray-600 cursor-pointer"
                onClick={nextsong}
              />
            </div>
          </div>
          <div className=" hidden md:flex flex-col gap-5 w-full md:w-1/2 h-full pt-30 overflow-auto pb-5">
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
        <div className=" flex items-center flex-col gap-5 w-full md:w-[50%] mt-15 overflow-auto pb-17.5 h-[70%] relative ">
          <Player />
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
      )}
    </div>
  );
};

export default Home;
