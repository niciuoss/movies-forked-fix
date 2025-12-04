import { Movie, Genre } from "../types/movie.types";

export function filterMovies(
  movies: Movie[],
  searchQuery: string,
  //selectedGenre: Genre [],
  selectedGenre: number | null,
  showOnlyFeatured: boolean
): Movie[] {
  return movies.filter((movie) => { 
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === null || movie.genre_ids.includes(selectedGenre);
    const matchesFeatured = !showOnlyFeatured || movie.featured === true;

    return matchesSearch && matchesGenre && matchesFeatured;
  });
 }

 export function sortMoviesByFeatured(movies: Movie[]): Movie[] {
  return [...movies].sort((a, b) => {
    if (a.featured === !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
 }

 export function getAvailableGenreIds(movies: Movie[]): Set<number> {
  const genreIds = new Set<number>();
  movies.forEach((movie) => {
    movie.genre_ids.forEach(id => genreIds.add(id));
  });
  return genreIds;
 }

//  export function getFeaturedMovieIds(movies: Movie[]): number[] {
//   return movies
//     .filter((movie) => movie.featured)
//     .map((movie) => movie.id);
//  }

 export function addFeaturedFlag(movies: Movie[], featuredMovieIds: number[]): Movie[] {
  return movies.map((movie) => ({
    ...movie,
    featured: featuredMovieIds.includes(movie.id),
  }));
 }