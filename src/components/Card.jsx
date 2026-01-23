import React, { useContext } from 'react'
import { songsData } from '../content'
import { MdPlaylistAdd } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import { datacontext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { AddSong, RemoveSong } from '../redux/PlaylistSlice';
import { AddLiked, RemoveLiked } from '../redux/LikedSlice';
import { IoHeartSharp } from "react-icons/io5";



const Card = ({ name, image, singer, songIndex }) => {
    let { playsong, index, setindex } = useContext(datacontext)
    let dispatch = useDispatch()
    let sng = useSelector(state => state.playlist)
    const songalreadyexist = sng.some((song) => song.songIndex === songIndex)
    let likedsng = useSelector(state => state.liked)
    const songalreadyliked = likedsng.some((song) => song.songIndex === songIndex)
    return (
        <div className='w-[90%] h-17.5 md:h-30 bg-gray-600 rounded-lg p-1.25 md:p-2.5 flex justify-center items-center hover:bg-gray-500 transition-all '>
            <div className='flex justify-start items-center gap-5 w-[70%] h-full cursor-pointer ' onClick={() => {
                setindex(songIndex)
                playsong()
            }}>
                <div>
                    <img src={image} alt="" className='w-15 max-h-15 md:max-h-25 md:w-25 rounded-lg  ' />
                </div>
                <div className='text-[15px] md:text-[20px] '>
                    <div className='text-white text-[1.1em] font-semibold'>{name}</div>
                    <div className='text-gray-400 text-[0.7em]  font-semibold'> {singer}</div>

                </div>
            </div>
            <div className='flex justify-center items-center gap-5 w-[30%] h-full text-[15px] md:text-[20px]  '>
                {!songalreadyexist && (<div className='' onClick={() => { dispatch(AddSong({ name: name, image: image, singer: singer, songIndex: songIndex })) }}>
                    <MdPlaylistAdd className='text-white text-[1.5em] cursor-pointer' />
                </div>)}

                {songalreadyexist && (<div className='' onClick={() => { dispatch(RemoveSong(songIndex)) }}>
                    <MdOutlinePlaylistRemove
                        className='text-white text-[1.5em] cursor-pointer' />
                </div>)}
                {!songalreadyliked && (<div onClick={() => { dispatch(AddLiked({ name: name, image: image, singer: singer, songIndex: songIndex })) }}>
                    <IoHeartOutline className='text-white text-[1.3em] cursor-pointer' />
                </div>)}
                {songalreadyliked && (<div onClick={() => { dispatch(RemoveLiked(songIndex)) }}>
                    <IoHeartSharp className='text-white text-[1.3em] cursor-pointer' />
                </div>)}

            </div>
        </div>
    )
}

export default Card
