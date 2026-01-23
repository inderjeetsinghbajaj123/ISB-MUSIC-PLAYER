import React, { useContext } from 'react'
import { datacontext } from '../context/UserContext'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { songsData } from '../content';


const Player = () => {
  let { playingsong, playsong, pausesong, index } = useContext(datacontext)
  return (
    <div className='w-full md:w-[60%] h-25 bg-white fixed bottom-13.75 md:bottom-0 rounded-t-[30px] shadow-lg flex pt-2.5 md:items-center md:p-4'>
      <div className='flex justify-start items-start  gap-5 w-[70%] h-full cursor-pointer pl-8 '>
        <div>
          <img src={songsData[index].image} alt="" className='w-15 max-h-15 md:h-20  md:max-h-25 md:w-20 rounded-lg object-fill ' />
        </div>
        <div className='text-[20px] md:text-[25px] '>
          <div className='text-black text-[1.1em] font-semibold'>{songsData[index].image}</div>
          <div className='text-gray-800 text-[0.6em]  font-semibold'> {songsData[index].singer}</div>
        </div>
      </div>
      <div className='w-[20%] h-full md:flex justify-center items-center'>
        {!playingsong ? <div className='w-12.5 h-12.5 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer'><FaPlay className='w-5 h-7 ' onClick={() => playsong()} /></div>
          :
          <div className='w-12.5 h-12.5 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer'><FaPause className='w-5 h-7 ' onClick={() => pausesong()} /></div>}
      </div>
    </div>
  )
}

export default Player
