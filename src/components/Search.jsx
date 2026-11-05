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
    <div className='w-full h-screen bg-black flex flex-col justify-start  pt-5 md:pt-25 items-center gap-8'>
      <Player />
      <form action="" onSubmit={(e) => e.preventDefault()} className='w-[90%] md:w-[60%] h-15 bg-gray-700 flex justify-center items-center gap-5 rounded-lg  overflow-hidden p-4 md:p-0 '>
        <FaSearch className=' text-gray-100 text-[18px]' />
        <input type="text" className='w-[90%] h-full bg-gray-700 outline-none border-0 text-white p-2.5 text-[18px] ' placeholder='search songs...' value={input} onChange={(e) => setinput(e.target.value)} />
      </form>
      {input ? <div className='w-full h-[65%] md:h-full flex flex-col justify-start p-2.5 items-center gap-5 overflow-auto'>
        {list.map((song) => (
          <Card name={song.name} image={song.image} singer={song.singer} songIndex={song.id - 1} />
        ))}
      </div> : <div className='text-gray-600 text-[30px] font-semibold '>SEARCH SONGS....</div>}

    </div>
  )
}

export default Search
