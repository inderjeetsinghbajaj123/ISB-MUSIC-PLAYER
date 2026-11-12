import React, { useEffect, useState } from 'react'
import Player from './Player';
import { FaSearch } from "react-icons/fa";
import { songsData } from '../content';
import Card from './Card';
const Search = () => {

  const [input, setinput] = useState("")
  const [list, setlist] = useState([])
  useEffect(() => {
    const query = input.toLowerCase();

    const filtered = songsData.filter(song =>
      song.name.toLowerCase().includes(query) ||
      song.singer.toLowerCase().includes(query)
    );

    setlist(filtered);
  }, [input]);

  return (
    <div className='w-full h-dvh bg-black flex flex-col justify-start pt-5 md:pt-25 pb-36 items-center gap-5 md:gap-8 overflow-hidden'>
      <Player />
      <form action="" onSubmit={(e) => e.preventDefault()} className='w-[calc(100%-2rem)] sm:w-[90%] md:w-[60%] min-h-14 md:h-15 bg-gray-700 flex justify-center items-center gap-3 sm:gap-5 rounded-xl overflow-hidden px-3 sm:px-4 md:px-0 shrink-0'>
        <FaSearch className=' text-gray-100 text-[18px]' />
        <input type="text" className='w-full min-w-0 h-full bg-gray-700 outline-none border-0 text-white py-2.5 text-base sm:text-[18px] ' placeholder='Search songs...' value={input} onChange={(e) => setinput(e.target.value)} />
      </form>
      {input ? <div className='w-full flex-1 min-h-0 flex flex-col justify-start px-3 sm:px-5 items-center gap-3 sm:gap-5 overflow-auto'>
        {list.map((song) => (
          <Card key={song.id} name={song.name} image={song.image} singer={song.singer} songIndex={song.id - 1} />
        ))}
      </div> : <div className='flex-1 flex items-center text-center px-5 text-gray-500 text-xl sm:text-2xl font-semibold'>Search songs to get started</div>}

    </div>
  )
}

export default Search
