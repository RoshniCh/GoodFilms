import authService from '../components/api-authorization/AuthorizeService'

export interface MovieListResponse {
    movieList: MovieResponse[];
  }

  // export enum language {
  //   Hindi,
  //   Tamil,
  //   Malayalam
  // }

  // export enum genre {
  //   Thriller,
  //   Comedy,
  //   Romance,
  //   Drama
  // }
  
  export interface MovieResponse {
    id: number;
    title: string;
    language: string;
    genre: string;
    director: string;
    actor: string;
    actress: string;
    releaseDate: string;
    year: number;
    likes: number;
    dislikes: number;
  }

  export interface NewMovie {
    title: string;
    language: string;
    genre: string;
    director: string;
    actor: string;
    actress: string;
    releasedate: string;
  }
  
export async function getLatestMovies(): Promise<MovieListResponse> {
    const response = await fetch(`/Home/LatestMovieList/`);
    
    if (!response.ok) {
      throw new Error(await response.json());
    }
    return await response.json();
}
export async function getBestMovies(): Promise<MovieListResponse> {
  const response = await fetch(`/Home/BestMovieList/`);
    
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}

export async function getWorstMovies(): Promise<MovieListResponse> {
  const response = await fetch(`/Home/WorstMovieList/`);
    
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}

export async function submitMovie(newMovie: NewMovie) {
  const token = await authService.getAccessToken();
  const response = await fetch(`/Admin/AddMovie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(newMovie),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function getMoviesbyLanguage(lang : string): Promise<MovieListResponse> {
  const response = await fetch(`/Discover/Language/${lang}`);
  
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}

export async function getMoviesbyGenre(genre : string): Promise<MovieListResponse> {
  const response = await fetch(`/Discover/Genre/${genre}`);
  
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}