/* export interface Anime {
    id: number; // ID del anime
    coverImage: {
      extraLarge?: string; // URL de la imagen de portada (tamaño extra grande)
    };
    title: {
      english?: string; // Título en inglés
      native?: string; // Título en japonés (o idioma original)
    };
    description?: string; // Descripción del anime
    episodes?: number; // Número de episodios
    popularity?: number; // Popularidad del anime
    status?: string; // Estado de emisión (ej. "FINISHED", "RELEASING")
    startDate?: {
      year?: number; // Año de inicio
      month?: number; // Mes de inicio
      day?: number; // Día de inicio
    };
    endDate?: {
      year?: number; // Año de finalización
      month?: number; // Mes de finalización
      day?: number; // Día de finalización
    };
    trailer?: {
      id?: string; // ID del trailer
      site?: string; // Sitio del trailer (ej. "youtube")
    };
    genres?: string[]; // Géneros del anime
    isFavourite?: boolean; // Indica si el anime está marcado como favorito
}
 */
export interface Anime {
    id: number;
    coverImage: {
        extraLarge: string;
    };
    title: {
        english: string;
        native: string;
    };
};