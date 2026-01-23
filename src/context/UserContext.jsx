import React, { createContext, useEffect, useRef, useState } from 'react'
import { songsData } from '../content'
export const datacontext = createContext()

const UserContext = ({ children }) => {
    let audioRef = useRef(new Audio())
    const [index, setindex] = useState(0)
    const [playingsong, setplayingsong] = useState(false)

    useEffect(() => {
        audioRef.current.src = songsData[index].song
        audioRef.current.load()
        if (playingsong) {
            playsong()
        }
    }, [index])
    function playsong() {
        setplayingsong(true)
        audioRef.current.play()
    }
    function pausesong() {
        setplayingsong(false)
        audioRef.current.pause()
    }
    function nextsong() {
        setindex((prev) => (prev + 1) % songsData.length)

    }
    function prevsong() {
        setindex((prev) => {
            if (prev === 0) {
                return songsData.length - 1
            } else {
                return prev - 1
            }
        })

    }

    let value = {
        nextsong, audioRef, playsong, prevsong, pausesong, playingsong, setplayingsong, index, setindex
    }
    return (
        <div>
            <datacontext.Provider value={value}>
                {children}
            </datacontext.Provider>
        </div>
    )
}

export default UserContext
