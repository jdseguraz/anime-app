// Función para obtener la temporada actual
export const getCurrentSeason = () => {
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
  
// Generar años desde 2000 hasta el año actual
export const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i).reverse();
};

export const formatStatus = (status: string) => {
    if (!status) return 'N/A';
    const withSpaces = status.replace(/[\*_]/g, ' ');
    return withSpaces.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
};
