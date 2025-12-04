import { useState, useEffect } from 'react';
import { Movie } from '../types/movie.types';
import { fetchMoviesFromStrapi } from '../services/api';

import popularMovies from '../data/popular.json';
import nowPlayingMovies from '../data/now-playing.json';
import topRatedMovies from '../data/top-rated.json';
import upcomingMovies from '../data/upcoming.json';
import { addFeaturedFlag } from '../utils/movieHelpers';

const FEATURED_MOVIE_IDS = [238, 695721, 572802, 872585, 603692];

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'strapi' | 'local'>('local');

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      setError(null);

      try {
        const strapiMovies = await fetchMoviesFromStrapi();
        
        if (strapiMovies.length > 0) {
          setMovies(strapiMovies);
          setSource('strapi');
        } else {
          throw new Error('No movies in Strapi');
        }
      } catch (err) {
        console.warn('Failed to load from Strapi, using local data:', err);
        
        const localMoviesMap = new Map<number, Movie>();
        
        [...popularMovies, ...nowPlayingMovies, ...topRatedMovies, ...upcomingMovies].forEach(movie => {
          if (!localMoviesMap.has(movie.id)) {
            localMoviesMap.set(movie.id, movie as Movie);
          }
        });

        const uniqueMovies = Array.from(localMoviesMap.values());
        const moviesWithFeatured = addFeaturedFlag(uniqueMovies, FEATURED_MOVIE_IDS);
        
        setMovies(moviesWithFeatured);
        setSource('local');
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return { movies, loading, error, source };
}
