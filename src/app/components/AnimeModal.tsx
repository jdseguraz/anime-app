'use client';

import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; // Importa el tipo RootState
import { toggleFavorite } from '../store/slices/favoritesSlices'; // Importa la acción de favoritos

interface AnimeModalProps {
  animeId: number; // Solo recibimos el ID del anime
  onClose: () => void;
}

// Consulta GraphQL para obtener los detalles del anime
const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id) {
      id
      bannerImage
      coverImage {
        extraLarge
      }
      title {
        english
        native
      }
      description
      episodes
      popularity
      status
      startDate {
        day
        month
        year
      }
      endDate {
        day
        month
        year
      }
      trailer {
        site
        id
      }
    }
  }
`;

export default function AnimeModal({ animeId, onClose }: AnimeModalProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites); // Obtener la lista de favoritos desde Redux
  const isFavorite = favorites.includes(animeId); // Verificar si el anime actual está en favoritos

  // Consulta GraphQL para obtener los detalles del anime
  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: animeId },
  });

  if (loading) return <p>Cargando...</p>; // Mostrar carga mientras se obtienen los datos
  if (error) return <p>Error: {error.message}</p>; // Mostrar error si la consulta falla

  const anime = data?.Media; // Datos del anime obtenidos de la API

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        {/* Banner */}
        <img
          src={anime.bannerImage || '/default-banner.jpg'}
          alt={anime.title.english || 'Anime banner'}
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Título */}
        <h2 className="text-2xl font-bold mt-4">{anime.title.english || anime.title.native}</h2>

        {/* Descripción */}
        <p className="text-gray-600 mt-2">{anime.description}</p>

        {/* Detalles */}
        <div className="mt-4">
          <p><strong>Episodios:</strong> {anime.episodes}</p>
          <p><strong>Popularidad:</strong> {anime.popularity}</p>
          <p><strong>Estado:</strong> {anime.status}</p>
          <p><strong>Fecha de inicio:</strong> {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</p>
          {anime.endDate && (
            <p><strong>Fecha de finalización:</strong> {anime.endDate.year}-{anime.endDate.month}-{anime.endDate.day}</p>
          )}
        </div>

        {/* Tráiler */}
        {anime.trailer && (
          <div className="mt-4">
            <a
              href={`https://${anime.trailer.site}.com/watch?v=${anime.trailer.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Ver tráiler
            </a>
          </div>
        )}

        {/* Botón de favoritos */}
        <button
          onClick={() => dispatch(toggleFavorite(animeId))} // Usar la acción de Redux
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>

        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}