import authService from '../components/api-authorization/AuthorizeService'

export interface MovieListResponse {
    movieList: MovieResponse[];
    totalNumberOfMovies: number;
  }
  
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

export async function searchMovies(title :string, language: string, genre : string, director :string, actor : string,
  actress : string, releasedate: string, year: string, pageNumber: number, pageSize: number): Promise<MovieListResponse> {
  const response = await fetch(`/Search?title=${title}&language=${language}&genre=${genre}&director=${director}&actor=${actor}&actress=${actress}&releasedate=${releasedate}&year=${year}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return await response.json();
}


export async function MovieLike(Id: number): Promise<MovieResponse> {
  const response = await fetch(`/Admin/UpdateLike/${Id}`, {
    method: "POST"});

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}

export async function MovieDislike(Id: number): Promise<MovieResponse> {
  const response = await fetch(`/Admin/UpdateDislike/${Id}`, {
    method: "POST"});

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}

export async function updateMovie(movieToUpdate: MovieResponse) {
  const token = await authService.getAccessToken();
  const response = await fetch(`/Admin/UpdateMovie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(movieToUpdate),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function getMovieById(id : number): Promise<MovieResponse> {
  const response = await fetch(`/Admin/MovieById/${id}`);
  
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}

export async function MovieDelete(Id: number): Promise<MovieResponse> {
  const response = await fetch(`/Admin/DeleteMovie/${Id}`, {
    method: "POST"});

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}