import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './DiscoverGenre.scss';
import { MovieListResponse, MovieResponse, getMoviesbyGenre } from "../../Api/apiClient";

export function GenreMovieTable(data: MovieResponse): JSX.Element {
  
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.language}</td>
        <td className ="hide-column-mobile" >{data.director}</td>
        <td className ="hide-column-mobile" >{data.actor}</td>
        <td className ="hide-column-mobile" >{data.actress}</td>
        <td>{data.releaseDate}</td>
        <td className ="hide-column-mobile" >{data.likes}</td>
        <td className ="hide-column-mobile" >{data.dislikes}</td>
       </tr>
    );
}

export function DiscoverGenre() : JSX.Element {
    
    const [selectedGenre, setSelectedGenre] = useState("Thriller");
    const [genreMovies, setGenreMovies] = useState<MovieListResponse | null>(null);
    
    useEffect(() => {
        getMoviesbyGenre(selectedGenre)
        .then(data => setGenreMovies(data));
    }, [selectedGenre]);

    if (!genreMovies) {
        return <div className="content-container"> <p className="body-text">Waiting for data!</p></div>;
    }
    return (
        <div>
            <div className="content-sub-container">
            <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
            </div>
            <div className="content-sub-container">
                <h2 className="sub-heading"> Discover Top Rated Movies by Genre</h2>
                <div className="button-container">
                    <button className={selectedGenre == "Thriller" ? "form-selected-button" : "form-button"} onClick={() => setSelectedGenre("Thriller")}>Thriller</button>
                    <button className={selectedGenre == "Comedy" ? "form-selected-button" : "form-button"} onClick={() => setSelectedGenre("Comedy")}>Comedy</button>
                    <button className={selectedGenre == "Romance" ? "form-selected-button" : "form-button"} onClick={() => setSelectedGenre("Romance")}>Romance</button>
                    <button className={selectedGenre == "Drama" ? "form-selected-button" : "form-button"} onClick={() => setSelectedGenre("Drama")}>Drama</button>
                </div>
                <table className="table body-text latest-movie-container">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Language</th>
                        <th className ="hide-column-mobile" scope="col">Director</th>
                        <th className ="hide-column-mobile" scope="col">Actor</th>
                        <th className ="hide-column-mobile" scope="col">Actress</th>
                        <th scope="col">Release Date</th>
                        <th className ="hide-column-mobile" scope="col">Likes</th>
                        <th className ="hide-column-mobile" scope="col">Dislikes</th>
                    </tr>
                    </thead>
                    <tbody>
                        {genreMovies.movieList?.map((x) => <GenreMovieTable {...x} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}