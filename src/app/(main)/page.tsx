'use client';
import { useSearchParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import Filters from '../components/Filters';
import AnimeCard from '../components/AnimeCard';

// Función para obtener la temporada actual
const getCurrentSeason = () => {
  const date = new Date();
  const month = date.getMonth() + 1; // getMonth() devuelve 0-11
  const year = date.getFullYear();

  let season;
  if (month >= 3 && month <= 5) season = 'SPRING';
  else if (month >= 6 && month <= 8) season = 'SUMMER';
  else if (month >= 9 && month <= 11) season = 'FALL';
  else season = 'WINTER';

  return { season, year };
};

// Consulta para animes filtrados
const GET_ANIMES = gql`
  query GetAnimes($search: String, $genre: String, $year: Int, $status: MediaStatus, $season: MediaSeason) {
    Page(page: 1, perPage: 10) {
      media(
        type: ANIME
        isAdult: false
        search: $search
        genre: $genre
        seasonYear: $year
        status: $status
        season: $season
      ) {
        id
        coverImage {
          extraLarge
        }
        title {
          english
          native
        }
      }
    }
  }
`;

// Consulta para animes populares de esta temporada
const GET_POPULAR_THIS_SEASON = gql`
  query GetPopularThisSeason($season: MediaSeason, $year: Int) {
    Page(page: 1, perPage: 6) {
      media(
        type: ANIME
        isAdult: false
        season: $season
        seasonYear: $year
        sort: POPULARITY_DESC
      ) {
        id
        coverImage {
          extraLarge
        }
        title {
          english
          native
        }
      }
    }
  }
`;

// Consulta para animes populares de todos los tiempos
const GET_POPULAR_ALL_TIME = gql`
  query GetPopularAllTime {
    Page(page: 1, perPage: 6) {
      media(
        type: ANIME
        isAdult: false
        sort: POPULARITY_DESC
      ) {
        id
        coverImage {
          extraLarge
        }
        title {
          english
          native
        }
      }
    }
  }
`;

export default function Home() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const genre = searchParams.get('genre');
  const year = searchParams.get('year');
  const status = searchParams.get('status');
  const season = searchParams.get('season');

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
              <h2 className="text-2xl font-bold mb-4">Resultados Filtrados</h2>
              {filteredData?.Page.media.length === 0 ? ( // Verificar si no hay resultados
                <p className="text-gray-600">No se encontraron coincidencias.</p>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {filteredData?.Page.media.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Mostrar animes populares de esta temporada si no hay filtros */}
          {showInitialLoad && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Popular esta temporada ({currentSeason} {currentYear})</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {popularThisSeasonData?.Page.media.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </ul>
            </div>
          )}

          {/* Mostrar animes populares de todos los tiempos si no hay filtros */}
          {showInitialLoad && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Popular todos los tiempos</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {popularAllTimeData?.Page.media.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}