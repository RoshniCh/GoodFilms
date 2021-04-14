import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Homepage.scss';
import { MovieListResponse, MovieResponse, getLatestMovies, getBestMovies, getWorstMovies } from "../../Api/apiClient";

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
export function BestMovieTable(data: MovieResponse): JSX.Element {
  
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.language}</td>
        <td>{data.genre}</td>
        <td>{data.likes}</td>
      </tr>
    );
}
export function WorstMovieTable(data: MovieResponse): JSX.Element {
  
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.language}</td>
        <td>{data.genre}</td>
        <td>{data.dislikes}</td>
      </tr>
    );
}
export function Homepage() : JSX.Element {
    const [latestMovies, setLatestMovies] = useState<MovieListResponse | null>(null);
    const [bestMovies, setBestMovies] = useState<MovieListResponse | null>(null);
    const [worstMovies, setWorstMovies] = useState<MovieListResponse | null>(null);
    
    useEffect(() => {
        getLatestMovies()
        .then(data => setLatestMovies(data));
    }, []);

    useEffect(() => {
        getBestMovies()
        .then(data => setBestMovies(data));
    }, []);

    useEffect(() => {
        getWorstMovies()
        .then(data => setWorstMovies(data));
    }, []);

    if (!latestMovies || !bestMovies || !worstMovies) {
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
            <h2 className="sub-heading"> Best Movies by Likes</h2>
            <table className="table body-text admin-table">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Langauge</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Likes</th>
                </tr>
                </thead>
                <tbody>
                    {bestMovies.movieList?.map((x) => <BestMovieTable {...x} />)}
                </tbody>
            </table>
            <h2 className="sub-heading"> Worst Movies by Dislikes</h2>
            <table className="table body-text admin-table">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Langauge</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Dislikes</th>
                </tr>
                </thead>
                <tbody>
                    {worstMovies.movieList?.map((x) => <WorstMovieTable {...x} />)}
                </tbody>
            </table>
        </div>
    );
}