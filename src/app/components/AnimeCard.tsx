'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlices';
import { RootState } from '../store/store';

interface AnimeCardProps {
  anime: {
    id: number;
    coverImage: {
      extraLarge: string;
    };
    title: {
      english: string;
      native: string;
    };
  };
  isFavorite: boolean;
}

export default function AnimeCard({ anime, isFavorite }: AnimeCardProps) {
  const dispatch = useDispatch();

  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(anime.id));
  };

  return (
    <div className="cursor-pointer">
      <div className="w-full">
        <img
          src={anime.coverImage.extraLarge || '/default-banner.jpg'}
          alt={anime.title.english || 'Anime banner'}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold">
          {anime.title.english} - {anime.title.native}
        </h3>
        {/* Botón de favoritos */}
        <button
          onClick={handleToggleFavorite}
          className={`mt-2 px-4 py-2 rounded-lg ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    </div>
  );
}