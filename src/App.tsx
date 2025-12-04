import { useState, useMemo } from 'react';
import  Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import FeaturedToggle from './components/FeaturedToggle/FeaturedToggle';
import MovieModal from './components/MovieModal/MovieModal';
import { Movie, Genre } from './types/movie.types';
import { filterMovies, getAvailableGenreIds, addFeaturedFlag } from './utils/movieHelpers';

import popularMovies from './data/popular.json';
import nowPlayingMovies from './data/now-playing.json';
import upcomingMovies from './data/upcoming.json';
import topRatedMovies from './data/top-rated.json';
import genresData from './data/genres.json';

import './App.css';

const FEATURED_MOVIE_IDS = [695721, 1029575, 891699, 787699, 8871];

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const allMovies = useMemo(() => {
    const movieMap = new Map<number, Movie>();

    [...popularMovies, ...nowPlayingMovies, ...topRatedMovies, ...upcomingMovies].forEach(movie => {
      if(!movieMap.has(movie.id)) {
        movieMap.set(movie.id, movie as Movie);
      }
   });

    const uniqueMovies = Array.from(movieMap.values());
    return addFeaturedFlag(uniqueMovies, FEATURED_MOVIE_IDS);
    }, []);
  
  const filteredMovies = useMemo(() => {
    return filterMovies(allMovies, searchQuery, selectedGenre, showOnlyFeatured);
  }, [allMovies, searchQuery, selectedGenre, showOnlyFeatured]);

  const searchFilteredMovies = useMemo(() => {
    return filterMovies(allMovies, searchQuery, null, showOnlyFeatured);
  }, [allMovies, searchQuery, showOnlyFeatured]);

  const availableGenreIds = useMemo(() => {
    return getAvailableGenreIds(searchFilteredMovies);
  }, [searchFilteredMovies]);

  const genres = genresData as Genre[];

  return (
    <div className="app">
      <Header />

      <main className="main">
        <div className="container">
          <div className="filters">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder='Buscar filmes por título...'
            />

            <div className="filterRows">
              <CategoryFilter
                genres={genres}
                availableGenreIds={availableGenreIds}
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
              />

              <FeaturedToggle
                enabled={showOnlyFeatured}
                onToggle={setShowOnlyFeatured}
              />
            </div>
          </div>

          <div className="results">
            <p className="resultsCount">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'filme encontrado' : 'filmes encontrados'}
            </p>
          </div>

          <MovieList
            movies={filteredMovies}
            onMovieClick={setSelectedMovie}
          />

          {filteredMovies.length === 0 && (
            <div className="emptyResults">
              <span className="emptyStateIcon">🎬</span>
              <h3>Nenhum filme encontrado</h3>
              <p>Experimente ajustar seus filtros ou a busca para encontrar algo.</p>
            </div>
          )}
        </div>
      </main>

      <MovieModal
        movie={selectedMovie}
        genres={genres}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  )
  
}


