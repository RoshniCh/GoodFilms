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
  
export async function getLatestMovies(): Promise<MovieListResponse> {
    const response = await fetch(`/Home/LatestMovieList/`);
    
    if (!response.ok) {
      throw new Error(await response.json());
    }
    return await response.json();
  }