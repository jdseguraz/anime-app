import { gql } from '@apollo/client';

// Consulta para obtener los géneros
export const GET_GENRES = gql`
  query GetGenres {
    GenreCollection
  }
`;


// Consulta para animes filtrados
export const GET_ANIMES = gql`
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
export const GET_POPULAR_THIS_SEASON = gql`
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
export const GET_POPULAR_ALL_TIME = gql`
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


// Consulta para obtener los animes favoritos
export const GET_FAVORITE_ANIMES = gql`
  query GetFavoriteAnimes($ids: [Int!]) {
    Page(page: 1, perPage: 50) {
      media(id_in: $ids, type: ANIME, isAdult: false) {
        id
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
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        trailer {
          id
          site
        }
      }
    }
  }
`;

// Consulta GraphQL para obtener los detalles del anime
export const GET_ANIME_DETAILS = gql`
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
