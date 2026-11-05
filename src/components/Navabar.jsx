import React from 'react'
import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navabar = () => {
    return (
        <div className='z-30 w-full h-20 bg-black fixed bottom-0 md:top-0 text-white flex justify-around md:justify-center items-center gap-12.5 p-3 rounded-t-[30px]'>
            <Link to={"/"}>
                <IoIosHome className='w-6 h-6' />
            </Link>
            <Link to={"/search"}>
                <FaSearch className='w-6 h-6' />
            </Link>
            <Link to={"/playlist"}>
                <RiPlayListFill className='w-6 h-6' />
            </Link>
            <Link to={"/like"}>
                <FaHeart className='w-6 h-6' />
            </Link>
        </div>
    )
}

export default Navabar
