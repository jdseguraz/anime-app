'use client';

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
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <li key={anime.id}>
        <div className="w-full">
            <img
                src={anime.coverImage.extraLarge || '/default-banner.jpg'}
                alt={anime.title.english || 'Anime banner'}
                className="w-full h-48 object-cover"
            />
        </div>
        <div className="p-4">
            <h3 className="text-md font-semibold">{anime.title.english} - {anime.title.native}</h3>
        </div>
    </li>
  );
}