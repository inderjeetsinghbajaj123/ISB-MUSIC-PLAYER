import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: "playlist",
    initialState: [],
    reducers: {
        AddSong: (state, action) => {
            let exist = state.find((state) => state.songIndex == action.payload.songIndex)
            if (exist) {
                return
            } else {
                state.push(action.payload)
            }
        },
        RemoveSong: (state, action) => {
            return state.filter((song) => (song.songIndex !== action.payload))
        }
    }
})

export const { AddSong, RemoveSong } = playlistSlice.actions
export default playlistSlice.reducer