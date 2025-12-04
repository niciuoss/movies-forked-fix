import { Movie, StrapiResponse, StrapiMovie } from '../types/movie.types';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

function transformStrapiMovie(strapiMovie: StrapiMovie): Movie {
  return {
    id: strapiMovie.id,
    ...strapiMovie.attributes,
    genre_ids: strapiMovie.attributes.genre_ids || []
  };
}

export async function fetchMoviesFromStrapi(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/movies?pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies from Strapi');
    }

    const data: StrapiResponse = await response.json();
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
      throw new Error('Failed to fetch movie from Strapi');
    }

    const data = await response.json();
    return transformStrapiMovie(data.data);
  } catch (error) {
    console.error('Error fetching movie from Strapi:', error);
    throw error;
  }
}