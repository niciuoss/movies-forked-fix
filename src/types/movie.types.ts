export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  featured?: boolean;
}

export interface MovieFilters {
  searchQuery: string;
  selectedGenre: number | null;
  showOnlyFeatured: boolean;
}

export interface StrapiMovie {
  id: number;
  attributes: {
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_count: number;
    popularity: number;
    adult: boolean;
    featured: boolean;
    genre_ids: number[];
    original_language: string;
    video: boolean;
  };
}

export interface StrapiResponse{
  data: StrapiMovie[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}