'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_GENRES } from '../lib/queries/animeQueries';

// Importar enumeraciones
import { MEDIA_STATUS, MEDIA_SEASON } from '../lib/enums/mediaEnums';
import { getYears } from '../lib/utils/utils';

// Obtener la lista de años
const YEARS = getYears();

const Filters = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // Estados para los filtros
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [genre, setGenre] = useState(searchParams.get('genre') || '');
    const [year, setYear] = useState(searchParams.get('year') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [season, setSeason] = useState(searchParams.get('season') || '');

    // Obtener la lista de géneros
    const { data: genresData } = useQuery(GET_GENRES);
    const genres = genresData?.GenreCollection || [];

    // Función para actualizar la URL con todos los filtros
    const updateURL = useCallback((includeSearch = false) => {
        const params = new URLSearchParams(searchParams);
        
        if (includeSearch) {
            if (search) params.set('search', search);
            else params.delete('search');
        }
        
        if (genre) params.set('genre', genre);
        else params.delete('genre');
        
        if (year) params.set('year', year);
        else params.delete('year');
        
        if (status) params.set('status', status);
        else params.delete('status');
        
        if (season) params.set('season', season);
        else params.delete('season');
        
        router.replace(`${pathname}?${params.toString()}`);
    }, [search, genre, year, status, season, searchParams, pathname, router]);
    
    // Actualizar la URL cuando cambien los filtros (excepto la búsqueda)
    useEffect(() => {
        updateURL(false);
    }, [genre, year, status, season, updateURL]);
    
    // Función para manejar la búsqueda específicamente
    const handleSearch = () => {
        updateURL(true);
    };
    
    // Función para limpiar un filtro específico
    const handleClearFilter = (filter: string) => {
        switch (filter) {
            case 'search':
                setSearch('');
                setTimeout(() => updateURL(true), 0);
                break;
            case 'genre':
                setGenre('');
                break;
            case 'year':
                setYear('');
                break;
            case 'status':
                setStatus('');
                break;
            case 'season':
                setSeason('');
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex space-y-4">
            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            {/* Género */}
            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            >
                <option value="">Genres</option>
                {genres.map((genre) => (
                <option key={genre} value={genre}>
                    {genre}
                </option>
                ))}
            </select>

            {/* Año de emisión */}
            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
            >
                <option value="">Year</option>
                {YEARS.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
                ))}
            </select>

            {/* Estado de emisión */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">Airing Status</option>
                {MEDIA_STATUS.map(({ name, value }) => (
                <option key={value} value={value}>
                    {name}
                </option>
                ))}
            </select>

            {/* Temporada de emisión */}
            <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            >
                <option value="">Season</option>
                {MEDIA_SEASON.map((season) => (
                <option key={season} value={season}>
                    {season}
                </option>
                ))}
            </select>

            {/* Botón de búsqueda */}
            <button onClick={handleSearch}>Search</button>

            {/* Mostrar filtros seleccionados */}
            <div className="flex flex-wrap gap-2">
                {search && (
                <div className="text-white">
                    <span>Search: {search}</span>
                    <button
                    onClick={() => handleClearFilter('search')}
                    className="ml-2 text-red-500 hover:text-red-700"
                    >
                    &times;
                    </button>
                </div>
                )}
                {genre && (
                <div className="text-white">
                    <span>Genre: {genre}</span>
                    <button
                    onClick={() => handleClearFilter('genre')}
                    className="ml-2 text-red-500 hover:text-red-700"
                    >
                    &times;
                    </button>
                </div>
                )}
                {year && (
                <div className="text-white">
                    <span>Year: {year}</span>
                    <button
                    onClick={() => handleClearFilter('year')}
                    className="ml-2 text-red-500 hover:text-red-700"
                    >
                    &times;
                    </button>
                </div>
                )}
                {status && (
                <div className="text-white">
                    <span>Status: {status}</span>
                    <button
                    onClick={() => handleClearFilter('status')}
                    className="ml-2 text-red-500 hover:text-red-700"
                    >
                    &times;
                    </button>
                </div>
                )}
                {season && (
                <div className="text-white">
                    <span>Season: {season}</span>
                    <button
                        onClick={() => handleClearFilter('season')}
                        className="ml-2 text-red-500 hover:text-red-700"
                        >
                        &times;
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default Filters;