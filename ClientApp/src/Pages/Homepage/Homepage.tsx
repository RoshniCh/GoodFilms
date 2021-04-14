import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Homepage.scss';
import { MovieListResponse, MovieResponse, getLatestMovies } from "../../Api/apiClient";

export function LatestMovieTable(data: MovieResponse): JSX.Element {
  
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.language}</td>
        <td>{data.genre}</td>
        <td>{data.director}</td>
        <td>{data.releaseDate}</td>
       </tr>
    );
  }
  

export function Homepage() : JSX.Element {
    const [latestMovies, setLatestMovies] = useState<MovieListResponse | null>(null);
    
    useEffect(() => {
        getLatestMovies()
        .then(data => setLatestMovies(data));
    }, []);

    if (!latestMovies) {
        return <div className="content-container"> <p className="body-text">Waiting for data!</p></div>;
    }
    return (
        <div className="content-container"> 
            <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
            <h2 className="sub-heading"> Latest Movie Releases</h2>
            <table className="table body-text admin-table" id="admin-table">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Langauge</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Director</th>
                    <th scope="col">Release Date</th>
                </tr>
                </thead>
                <tbody>
                    {latestMovies.movieList?.map((x) => <LatestMovieTable {...x} />)}
                    {/* {latestMovies.movieList?.map((data) => (
                              <tr>
                                <td>{data.title}</td>
                                <td>{data.language}</td>
                                <td>{data.genre}</td>
                                <td>{data.director}</td>
                                <td>{data.releaseDate}</td>
                             </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
}