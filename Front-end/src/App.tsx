import { useState, useMemo } from 'react';
import  Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import FeaturedToggle from './components/FeaturedToggle/FeaturedToggle';
import MovieModal from './components/MovieModal/MovieModal';
import { Movie, Genre } from './types/movie.types';
import { filterMovies, getAvailableGenreIds, /*addFeaturedFlag*/ } from './utils/movieHelpers';
import { useMovies } from './hooks/useMovies'

// import popularMovies from './data/popular.json';
// import nowPlayingMovies from './data/now-playing.json';
// import upcomingMovies from './data/upcoming.json';
// import topRatedMovies from './data/top-rated.json';
import genresData from './data/genres.json';

import './App.css';

//const FEATURED_MOVIE_IDS = [695721, 1029575, 891699, 787699, 8871];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { movies: allMovies, loading, source } = useMovies();

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

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <div className="container">
            <div className="loadingState">
              <div className="spinner"></div>
              <p>Carregando filmes...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      
      <main className="main">
        <div className="container">
          {source === 'local' && (
            <div className="dataSourceBanner">
              ℹ️ Usando dados locais. Configure o Strapi para usar a API.
            </div>
          )}

          <div className="filters">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar filmes por título..."
            />

            <div className="filterRow">
              <CategoryFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
                availableGenreIds={availableGenreIds}
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
            <div className="emptyState">
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
  );
}


