// Enumeración para Estado de Emisión
export const MEDIA_STATUS = [
    { name: 'Finished', value: 'FINISHED' },
    { name: 'Releasing', value: 'RELEASING' },
    { name: 'Not Yet Released', value: 'NOT_YET_RELEASED' },
    { name: 'Cancelled', value: 'CANCELLED' },
    { name: 'Hiatus', value: 'HIATUS' },
] as const;
  

// Enumeración para Temporada de Emisión
export const MEDIA_SEASON = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const;