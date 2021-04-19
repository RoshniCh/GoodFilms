import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMovies, MovieListResponse, MovieResponse } from "../../Api/apiClient";
import './SearchMovies.scss';

export function SearchMovieTable(data: MovieResponse): JSX.Element {
  
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




export function SearchMovies() : JSX.Element {
    type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";
    type PageStatus = "INITIAL" | "RESULTS";

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [actor, setActor] = useState("");
    const [actress, setActress] = useState("");
    const [releasedate, setReleasedate] = useState("");

    const [formStatus, setFormStatus] = useState<FormStatus>("READY");
    const [pageStatus, setPageStatus] = useState<PageStatus>("INITIAL");
    const [searchMovieList, setSearchMovieList] = useState<MovieListResponse | null>(null);

    function submitSearch(event: FormEvent) {
        event.preventDefault();
        setFormStatus("SUBMITTING");
        searchMovies(
          title,
          language,
          genre,
          director,
          actor,
          actress,
          releasedate,
        )
          .then(data => setSearchMovieList(data))
          .catch(() => setFormStatus("ERROR"))
          .then(() => setPageStatus("RESULTS"))
          .then(() => setFormStatus("READY"));
    }

    function results () {
        return (
                <div className="content-sub-container">
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
                            {searchMovieList?.movieList?.map((x) => <SearchMovieTable {...x} />)}
                        </tbody>
                    </table>
                </div>
        );
    } 

    function noResults(){
        return (
          <p>No Matching Results Found</p>
        )
      }
    
    if (pageStatus === "RESULTS") {
        return (
        <div>
        <div className="content-sub-container">
        <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
        </div>
        <div className="content-sub-container">
        <h2 className="sub-heading"> Search Movies</h2>
        <form onSubmit={submitSearch}>
            <label className="search-label">
                Movie Title
                <input className="search-input" value={title} onChange={(event) => setTitle(event.target.value)}/>
            </label>
            <label className="search-label">
                Langauge
                    <select className="search-input" name="language" onChange={(event) => setLanguage(event.target.value)}>
                        <option value="" disabled selected>Please choose one</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Malayalam">Malayalam</option>
                    </select>
            </label>
            <label className="search-label">
                    Genre
                    <select className="search-input" name="genre" onChange={(event) => setGenre(event.target.value)}>
                        <option value="" disabled selected>Please choose one</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Romance">Romance</option>
                        <option value="Drama">Drama</option>
                    </select>
            </label>
            <label className="search-label">
                Release Date
                <input type = "date" className="search-input" value={releasedate} onChange={(event) => setReleasedate(event.target.value)}/>
            </label><br/>

            <label className="search-label">
                Director
                <input className="search-input" value={director} onChange={(event) => setDirector(event.target.value)}/>
            </label>
            <label className="search-label">
                Lead Actor
                <input className="search-input" value={actor} onChange={(event) => setActor(event.target.value)}/>
            </label>
            <label className="search-label">
                Lead Actress
                <input className="search-input" value={actress} onChange={(event) => setActress(event.target.value)}/>
            </label>
            <button className="form-button" type="submit">
                Search
            </button>
        </form>
    
        {searchMovieList?.movieList && searchMovieList.movieList.length> 0 ? results() : noResults() }
        </div>
        </div>
        );
    } 

    return (
        <div>
            <div className="content-sub-container">
            <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
            </div>
            <div className="content-sub-container">
                <h2 className="sub-heading"> Search Movies</h2>
                <form onSubmit={submitSearch}>
                    <label className="search-label">
                        Movie Title
                        <input className="search-input" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </label>
                    <label className="search-label">
                        Langauge
                            <select className="search-input" name="language" onChange={(event) => setLanguage(event.target.value)}>
                                <option value="" disabled selected>Please choose one</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Malayalam">Malayalam</option>
                            </select>
                    </label>
                    <label className="search-label">
                            Genre
                            <select className="search-input" name="genre" onChange={(event) => setGenre(event.target.value)}>
                                <option value="" disabled selected>Please choose one</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                            </select>
                    </label>
                    <label className="search-label">
                        Release Date
                        <input type = "date" className="search-input" value={releasedate} onChange={(event) => setReleasedate(event.target.value)}/>
                    </label><br/>

                    <label className="search-label">
                        Director
                        <input className="search-input" value={director} onChange={(event) => setDirector(event.target.value)}/>
                    </label>
                    <label className="search-label">
                        Lead Actor
                        <input className="search-input" value={actor} onChange={(event) => setActor(event.target.value)}/>
                    </label>
                    <label className="search-label">
                        Lead Actress
                        <input className="search-input" value={actress} onChange={(event) => setActress(event.target.value)}/>
                    </label>
                    <button className="form-button" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}