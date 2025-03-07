'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

/* Consultas GraphQL */
import { GET_ANIMES, GET_POPULAR_THIS_SEASON, GET_POPULAR_ALL_TIME } from '../lib/queries/animeQueries';

/* componentes */
import Filters from '../components/Filters';
import AnimeCard from '../components/AnimeCard';
import AnimeModal from '../components/AnimeModal';

/* utils */
import { getCurrentSeason } from '../lib/utils/utils';

export default function Home() {
  const searchParams = useSearchParams();

  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const search = searchParams.get('search');
  const genre = searchParams.get('genre');
  const year = searchParams.get('year');
  const status = searchParams.get('status');
  const season = searchParams.get('season');

  // Estado para el modal
  const [selectedAnimeId, setSelectedAnimeId] = useState<null | any>(null);

  // Obtener la temporada y el año actuales
  const { season: currentSeason, year: currentYear } = getCurrentSeason();

  // Consulta para animes filtrados
  const { data: filteredData, loading: filteredLoading, error: filteredError } = useQuery(GET_ANIMES, {
    variables: { search, genre, year: year ? parseInt(year) : undefined, status, season },
    skip: !search && !genre && !year && !status && !season, // Solo ejecutar si hay filtros
  });

  // Consulta para animes populares de esta temporada
  const { data: popularThisSeasonData, loading: popularThisSeasonLoading, error: popularThisSeasonError } = useQuery(GET_POPULAR_THIS_SEASON, {
    variables: { season: currentSeason, year: currentYear },
    skip: !!search || !!genre || !!year || !!status || !!season, // Ocultar si hay filtros
  });

  // Consulta para animes populares de todos los tiempos
  const { data: popularAllTimeData, loading: popularAllTimeLoading, error: popularAllTimeError } = useQuery(GET_POPULAR_ALL_TIME, {
    skip: !!search || !!genre || !!year || !!status || !!season, // Ocultar si hay filtros
  });

  // Manejo de errores
  if (filteredError || popularThisSeasonError || popularAllTimeError) {
    return <p>Error: {filteredError?.message || popularThisSeasonError?.message || popularAllTimeError?.message}</p>;
  }

  // Mostrar carga inicial si no hay filtros
  const showInitialLoad = !search && !genre && !year && !status && !season;

  // Función para abrir el modal
  const handleOpenModal = (anime: number) => {
    setSelectedAnimeId(anime);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedAnimeId(null);
  };

  return (
    <div className="p-10 p-md-30">
      <Filters />
      {filteredLoading || popularThisSeasonLoading || popularAllTimeLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* Mostrar resultados filtrados si hay filtros */}
          {(search || genre || year || status || season) && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Results:</h2>
              {filteredData?.Page.media.length === 0 ? ( // Verificar si no hay resultados
                <p className="text-gray-600">No Results for your filters</p>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {filteredData?.Page.media.map((anime) => (
                    <li key={anime.id} onClick={() => handleOpenModal(anime.id)}>
                      <AnimeCard key={anime.id} anime={anime} isFavorite={favorites.includes(anime.id)} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Mostrar animes populares de esta temporada si no hay filtros */}
          {showInitialLoad && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">POPULAR THIS SEASON ({currentSeason} {currentYear})</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {popularThisSeasonData?.Page.media.map((anime) => (
                  <li key={anime.id} onClick={() => handleOpenModal(anime.id)}>
                    <AnimeCard key={anime.id} anime={anime} isFavorite={favorites.includes(anime.id)} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mostrar animes populares de todos los tiempos si no hay filtros */}
          {showInitialLoad && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">ALL TIME POPULAR </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {popularAllTimeData?.Page.media.map((anime) => (
                  <li key={anime.id} onClick={() => handleOpenModal(anime.id)}>
                    <AnimeCard key={anime.id} anime={anime} isFavorite={favorites.includes(anime.id)} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modal */}
          {selectedAnimeId && (
            <AnimeModal
              animeId={selectedAnimeId} // Solo pasamos el ID
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
}