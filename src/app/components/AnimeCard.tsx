'use client';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlices';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 

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
          className="mt-2 p-2 rounded-full hover:bg-red-300 transition-colors cursor-alias"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" /> // Corazón lleno
          ) : (
            <FaRegHeart className="text-red-500 text-xl" /> // Corazón vacío
          )}
        </button>
      </div>
    </div>
  );
}