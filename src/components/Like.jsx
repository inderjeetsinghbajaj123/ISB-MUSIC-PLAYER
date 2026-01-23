import React from 'react'
import Player from './Player';
import { useSelector } from 'react-redux';
import Card from './Card';

const Like = () => {
  let songs = useSelector(state => state.liked)
  return (
    <div className='w-full h-screen bg-black flex flex-col justify-start  pt-5 md:pt-25 items-center gap-8'>
      <Player />

      {!songs.length < 1 ? <>
        <h1 className='text-white font-semibold text-[20px] '>Liked Songs</h1>
        <div className='w-full h-[65%] md:h-full flex flex-col justify-start items-center gap-5'>
          {songs.map((song) => (
            <Card name={song.name} image={song.image} singer={song.singer} songIndex={song.songIndex} />
          ))}
        </div>
      </> : <div className='text-gray-600 text-[30px] font-semibold'>No Liked Songs</div>
      }

    </div>
  )
}

export default Like
