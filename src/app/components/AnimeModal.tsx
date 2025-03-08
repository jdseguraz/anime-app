'use client';

import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleFavorite } from '../store/slices/favoritesSlices';
import { GET_ANIME_DETAILS } from '../lib/queries/animeQueries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useRef, useEffect, useCallback } from 'react';
import { formatStatus } from '../lib/utils/utils';
import Loading from './Loading';
import Image from 'next/image';

interface AnimeModalProps {
  animeId: number;
  onClose: () => void;
}

type DateObject = {
  year?: number;
  month?: number;
  day?: number;
};


export default function AnimeModal({ animeId, onClose }: AnimeModalProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.includes(animeId);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Consulta GraphQL para obtener los detalles del anime
  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: animeId },
  });

  // Handler para cerrar el modal al hacer click fuera de él
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  // Configurar el event listener al montar el componente
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Formatear fecha
  const formatDate = (date: DateObject): string  => {
    if (!date || !date.year) return 'N/A';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  };

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-blend-darken bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center">
        <Loading/>
        <p className="text-xl">Cargando detalles del anime...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-blend-darken bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md">
        <h3 className="text-xl font-bold text-red-500 mb-4">Error al cargar</h3>
        <p>{error.message}</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );

  const anime = data?.Media;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-blend-darken backdrop-blur-sm z-50">
      <div 
        ref={modalContentRef}
        className="bg-amber-50 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl"
      >
        {/* Botón para cerrar el modal - Fijo en la esquina superior izquierda */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all duration-200 shadow-lg"
          aria-label="Cerrar"
        >
          <IoMdClose size={24} />
        </button>

        {/* Sección de banner con gradiente para mejor visibilidad del título */}
        <div className="relative">
          <div className="w-full h-64 bg-gray-200">
            {anime.bannerImage ? (
              <Image
                src={anime.bannerImage}
                alt={anime.title.english || anime.title.native}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <h1 className="text-3xl font-bold text-white">
                  {anime.title.english || anime.title.native}
                </h1>
              </div>
            )}
            {/* Gradiente sobre la imagen para mejorar visibilidad del texto */}
            {anime.bannerImage && (
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            )}
          </div>
        </div>

        {/* Contenido del anime */}
        <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="p-6">
            {/* Título y botón de favoritos */}
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold">
                {anime.title.english || anime.title.native}
                {anime.title.english && anime.title.native && anime.title.english !== anime.title.native && (
                  <span className="block text-lg text-gray-600 mt-1">
                    {anime.title.native}
                  </span>
                )}
              </h2>

              {/* Botón de favoritos */}
              <button
                onClick={() => dispatch(toggleFavorite(animeId))}
                className="p-3 rounded-full hover:bg-red-100 transition-colors focus:outline-none"
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-red-500 text-2xl" />
                )}
              </button>
            </div>

            {/* Detalles en tarjetas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <p className="text-sm text-blue-800 font-medium">Episodios</p>
                <p className="text-md font-bold">{anime.episodes || 'N/A'}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg shadow">
                <p className="text-sm text-purple-800 font-medium">Popularidad</p>
                <p className="text-md font-bold">{anime.popularity.toLocaleString() || 'N/A'}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <p className="text-sm text-green-800 font-medium">Estado</p>
                <p className="text-md font-bold">{formatStatus(anime.status )|| 'N/A'}</p>
              </div>
              <div className="bg-amber-100 p-4 rounded-lg shadow">
                <p className="text-sm text-amber-800 font-medium">Fecha de estreno</p>
                <p className="text-md font-bold">{formatDate(anime.startDate)}</p>
              </div>
            </div>

            {/* Descripción */}
            <div className="my-6 bg-amber-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Sinopsis</h3>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 my-6">
              {anime.endDate && anime.endDate.year && (
                <div className="flex items-baseline">
                  <span className="font-semibold mr-2 w-40">Fecha de finalización:</span>
                  <span>{formatDate(anime.endDate)}</span>
                </div>
              )}
              {/* Puedes agregar más información como géneros, estudios, etc. */}
            </div>

            {/* Tráiler */}
            {anime.trailer && (
              <div className="my-6">
                <h3 className="text-xl font-bold mb-3">Tráiler</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                    title="Tráiler del anime"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}