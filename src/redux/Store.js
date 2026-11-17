import { configureStore } from "@reduxjs/toolkit";
import playlistSlice from "./PlaylistSlice"
import LikedSlice from "./LikedSlice"

const LIKED_SONGS_STORAGE_KEY = "likedSongs";

const loadLikedSongs = () => {
    try {
        const savedSongs = localStorage.getItem(LIKED_SONGS_STORAGE_KEY);
        const parsedSongs = savedSongs ? JSON.parse(savedSongs) : [];
        return Array.isArray(parsedSongs) ? parsedSongs : [];
    } catch (error) {
        console.error("Failed to load liked songs from local storage.", error);
        return [];
    }
};

export const store = configureStore({
    reducer: {
        playlist: playlistSlice,
        liked: LikedSlice
    },
    preloadedState: {
        liked: loadLikedSongs()
    },
})

store.subscribe(() => {
    try {
        localStorage.setItem(
            LIKED_SONGS_STORAGE_KEY,
            JSON.stringify(store.getState().liked),
        );
    } catch (error) {
        console.error("Failed to save liked songs to local storage.", error);
    }
});