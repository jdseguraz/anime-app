import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './slices/animeSlice';

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;














/* Como usarlos 

import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/slices/animeSlice';
import { RootState } from '../store/store';

export default function AnimeCard({ anime }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.anime.favorites);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(anime));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(anime.id));
  };

  return (
    <div>
      <h2>{anime.title.english}</h2>
      <button onClick={handleAddToFavorites}>Añadir a favoritos</button>
      <button onClick={handleRemoveFromFavorites}>Eliminar de favoritos</button>
    </div>
  );
} */