import { Movie, StrapiResponse, StrapiMovie } from '../types/movie.types';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

function transformStrapiMovie(strapiMovie: StrapiMovie): Movie {
  return {
    id: strapiMovie.id,
    title: strapiMovie.title || 'Título não disponível',
    original_title: strapiMovie.original_title || strapiMovie.title || '',
    original_language: strapiMovie.original_language || 'en',
    poster_path: strapiMovie.poster_path || '',
    backdrop_path: strapiMovie.backdrop_path || '',
    overview: strapiMovie.overview || '',
    release_date: strapiMovie.release_date || '2000-01-01',
    vote_average: strapiMovie.vote_average || 0,
    vote_count: strapiMovie.vote_count || 0,
    popularity: strapiMovie.popularity || 0,
    adult: strapiMovie.adult || false,
    video: strapiMovie.video || false,
    featured: strapiMovie.featured || false,
    genre_ids: Array.isArray(strapiMovie.genre_ids) ? strapiMovie.genre_ids : []
  };
}

export async function fetchMoviesFromStrapi(): Promise<Movie[]> {
  try {
    const url = `${STRAPI_URL}/api/movies?pagination[pageSize]=100`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StrapiResponse = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format from Strapi');
    }
    
    return data.data.map(transformStrapiMovie);
  } catch (error) {
    console.error('Error fetching movies from Strapi:', error);
    throw error;
  }
}

export async function fetchMovieById(id: number): Promise<Movie> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/movies/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return transformStrapiMovie(data.data);
  } catch (error) {
    console.error('Error fetching movie from Strapi:', error);
    throw error;
  }
}