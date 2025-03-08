'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_GENRES } from '../lib/queries/animeQueries';
import { FaSearch } from 'react-icons/fa';

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
    
    // Función para limpiar todos los filtros
    const handleClearAll = () => {
        setSearch('');
        setGenre('');
        setYear('');
        setStatus('');
        setSeason('');
        
        // Actualizar URL sin parámetros
        router.replace(pathname);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                {/* Campo de búsqueda */}
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search anime..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full pl-4 pr-10 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={handleSearch}
                    >
                        <FaSearch className="text-gray-300 mr-3" />
                    </button>
                </div>

                {/* Estado de emisión */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                    <option value="">All Status</option>
                    {MEDIA_STATUS.map(({ name, value }) => (
                    <option key={value} value={value}>
                        {name}
                    </option>
                    ))}
                </select>

                {/* Género */}
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre: string) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                    ))}
                </select>

                {/* Año de emisión */}
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                    <option value="">All Years</option>
                    {YEARS.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>

                {/* Temporada de emisión */}
                <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                    <option value="">All Seasons</option>
                    {MEDIA_SEASON.map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                    ))}
                </select>

                {/* Botón de búsqueda */}
                <button 
                    onClick={handleSearch}
                    className="w-full md:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-md"
                >
                    Filter
                </button>
            </div>

            {/* Mostrar filtros seleccionados */}
            {(search || genre || year || status || season) && (
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="text-gray-400">Selected filters:</span>
                {search && (
                <div className="flex items-center text-purple-400">
                    <span>Search: {search}</span>
                    <button
                        onClick={() => handleClearFilter('search')}
                        className="ml-2 text-gray-400 hover:text-red-400"
                        aria-label="Remove search filter"
                    >
                        ×
                    </button>
                </div>
                )}
                {genre && (
                <div className="flex items-center text-blue-400">
                    <span>Genre: {genre}</span>
                    <button
                        onClick={() => handleClearFilter('genre')}
                        className="ml-2 text-gray-400 hover:text-red-400"
                        aria-label="Remove genre filter"
                    >
                        ×
                    </button>
                </div>
                )}
                {year && (
                <div className="flex items-center text-green-400">
                    <span>Year: {year}</span>
                    <button
                        onClick={() => handleClearFilter('year')}
                        className="ml-2 text-gray-400 hover:text-red-400"
                        aria-label="Remove year filter"
                    >
                        ×
                    </button>
                </div>
                )}
                {status && (
                <div className="flex items-center text-red-400">
                    <span>Status: {status}</span>
                    <button
                        onClick={() => handleClearFilter('status')}
                        className="ml-2 text-gray-400 hover:text-red-400"
                        aria-label="Remove status filter"
                    >
                        ×
                    </button>
                </div>
                )}
                {season && (
                <div className="flex items-center text-yellow-400">
                    <span>Season: {season}</span>
                    <button
                        onClick={() => handleClearFilter('season')}
                        className="ml-2 text-gray-400 hover:text-red-400"
                        aria-label="Remove season filter"
                    >
                        ×
                    </button>
                </div>
                )}
                <button
                    onClick={handleClearAll}
                    className="ml-auto text-sm text-gray-400 hover:text-white border border-gray-600 px-2 py-1 rounded hover:border-white transition-colors"
                >
                    Clean All
                </button>
            </div>
            )}
        </div>
        
    );
};

export default Filters;