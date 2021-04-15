import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './DiscoverLanguage.scss';
import { MovieListResponse, MovieResponse, getMoviesbyLanguage } from "../../Api/apiClient";

export function LangaugeMovieTable(data: MovieResponse): JSX.Element {
  
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.genre}</td>
        <td className ="hide-column-mobile" >{data.director}</td>
        <td className ="hide-column-mobile" >{data.actor}</td>
        <td className ="hide-column-mobile" >{data.actress}</td>
        <td>{data.releaseDate}</td>
        <td className ="hide-column-mobile" >{data.likes}</td>
        <td className ="hide-column-mobile" >{data.dislikes}</td>
       </tr>
    );
}

export function DiscoverLanguage() : JSX.Element {
    
    const [selectedLanguage, setSelectedLangauge] = useState("Hindi");
    const [languageMovies, setLanguageMovies] = useState<MovieListResponse | null>(null);
    
    useEffect(() => {
        getMoviesbyLanguage(selectedLanguage)
        .then(data => setLanguageMovies(data));
    }, [selectedLanguage]);

    if (!languageMovies) {
        return <div className="content-container"> <p className="body-text">Waiting for data!</p></div>;
    }
    return (
        <div>
            <div className="content-sub-container">
            <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
            </div>
            <div className="content-sub-container">
                <h2 className="sub-heading"> Discover Top Rated Movies by Language</h2>
                <div className="button-container">
                    <button className="form-button" onClick={() => setSelectedLangauge("Hindi")}>Hindi</button>
                    <button className="form-button" onClick={() => setSelectedLangauge("Tamil")}>Tamil</button>
                    <button className="form-button" onClick={() => setSelectedLangauge("Malayalam")}>Malayalam</button>
                </div>
                <table className="table body-text latest-movie-container">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th className ="hide-column-mobile" scope="col">Director</th>
                        <th className ="hide-column-mobile" scope="col">Actor</th>
                        <th className ="hide-column-mobile" scope="col">Actress</th>
                        <th scope="col">Release Date</th>
                        <th className ="hide-column-mobile" scope="col">Likes</th>
                        <th className ="hide-column-mobile" scope="col">Dislikes</th>
                    </tr>
                    </thead>
                    <tbody>
                        {languageMovies.movieList?.map((x) => <LangaugeMovieTable {...x} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}