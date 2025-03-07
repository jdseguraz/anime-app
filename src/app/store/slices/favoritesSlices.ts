import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: number[]; // Array de IDs de animes favoritos
}

const loadFavoritesFromLocalStorage = (): number[] => {
    if (typeof window !== 'undefined') {
      try {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
      } catch (error) {
        console.error('Error loading favorites from localStorage', error);
        return [];
      }
    }
    return [];
  };

const initialState: FavoritesState = {
    favorites: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
      toggleFavorite: (state, action: PayloadAction<number>) => {
        const animeId = action.payload;
        if (state.favorites.includes(animeId)) {
          // Si el anime ya está en favoritos, lo quitamos
          state.favorites = state.favorites.filter((id) => id !== animeId);
        } else {
          // Si el anime no está en favoritos, lo agregamos
          state.favorites.push(animeId);
        }
        // Guardar en localStorage
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;