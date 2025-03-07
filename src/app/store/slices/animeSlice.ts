import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnimeState {
  favorites: any[];
}

const initialState: AnimeState = {
  favorites: [],
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<any>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((anime) => anime.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = animeSlice.actions;
export default animeSlice.reducer;