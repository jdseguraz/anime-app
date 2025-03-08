'use client';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import AnimeCard from '@/app/components/AnimeCard';
import { useEffect, useState } from 'react'; // Importa useEffect y useState
import { GET_FAVORITE_ANIMES } from '@/app/lib/queries/animeQueries';
import Loading from '@/app/components/Loading';
import NoResults from '@/app/components/NoResults';
import { Anime } from '@/app/types/anime';

export default function FavoritesPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marcar que estamos en el cliente después del montaje
  }, []);

  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  // Consulta para obtener los detalles de los animes favoritos
  const { data, loading, error } = useQuery(GET_FAVORITE_ANIMES, {
    variables: { ids: favorites },
    skip: favorites.length === 0 || !isClient,
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !isClient) {
    return <Loading/>;
  }

  const favoriteAnimes = data?.Page.media || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your favorites</h1>

      {favoriteAnimes.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {favoriteAnimes.map((anime: Anime) => (
            <li key={anime.id}>
              <AnimeCard anime={anime} isFavorite={true} />
            </li>
          ))}
        </ul>
      ) : (
        <NoResults text="No favorites yet!"/>
      )}
    </div>
  );
}