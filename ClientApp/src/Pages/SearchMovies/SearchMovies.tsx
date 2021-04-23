import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMovies, MovieListResponse, MovieResponse, MovieLike, MovieDislike, MovieDelete } from "../../Api/apiClient";
import './SearchMovies.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUndo, faTrashAlt, faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
// import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import authService from '../../components/api-authorization/AuthorizeService';


export function SearchMovieTable(data: MovieResponse): JSX.Element {

    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        async function checkLoggedIn(){
            var userLoggedIn = await authService.isAuthenticated();
            setLoggedIn(userLoggedIn);
        }
        checkLoggedIn();
    }, [])
  
    function MovieLikeRequest(id: number) {
        MovieLike(id)
        .then(() =>setLikeClicked(true));
    }
    function MovieDislikeRequest(id: number) {
        MovieDislike(id)
        .then(() =>setDislikeClicked(true));
    }
    function MovieDeleteRequest(id: number) {
        MovieDelete(id)
        .then(() =>setDeleteClicked(true));
    }

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
        <td>
            <button className="like-dislike-button" type="submit" onClick={() => MovieLikeRequest(data.id)} disabled={likeClicked} aria-disabled={likeClicked}>
                Like
            </button>
            <button className="like-dislike-button" type="submit" onClick={() => MovieDislikeRequest(data.id)} disabled={dislikeClicked} aria-disabled={dislikeClicked}>
                Dislike
            </button>
        </td>
        <td>
            <Link to={`/UpdateMovie/${data.id}`}>
            <button className={loggedIn == true ?  "form-button-search" : "form-button-hide"} disabled={deleteClicked} aria-disabled={deleteClicked}>Update</button>
            </Link>
            <button className={loggedIn == true ?  "form-button-search" : "form-button-hide"} type="submit" onClick={() => MovieDeleteRequest(data.id)} disabled={deleteClicked} aria-disabled={deleteClicked}>
                Delete
            </button>
        </td>
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
    const [year, setYear] = useState("");

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
          year,
        )
          .then(data => setSearchMovieList(data))
          .catch(() => setFormStatus("ERROR"))
          .then(() => setPageStatus("RESULTS"))
          .then(() => setFormStatus("READY"));
    }
    function clearSearch() {
        setTitle("");
        setLanguage("");
        setGenre("");
        setDirector("");
        setActor("");
        setActress("");
        setReleasedate("");
        setYear("");
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
                            <th></th>
                            <th></th>
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
                    <option value="" selected>Please choose one</option>
                    <option value="Hindi">Hindi</option>
                    {/* <option value="Hindi" {(language=="Hindi")? 'selected':''}>Hindi</option> */}
                    <option value="Tamil">Tamil</option>
                    <option value="Malayalam">Malayalam</option>
                </select>
            </label>
            <label className="search-label">
                    Genre
                    <select className="search-input" name="genre" onChange={(event) => setGenre(event.target.value)}>
                        <option value="" selected>Please choose one</option>
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
            <label className="search-label">
                Year
                <input type = "number" className="search-input" value={year} onChange={(event) => setYear(event.target.value)}/>
            </label>
            <button className="form-button" type="submit">
                Search
            </button>
            <button className="form-button" type="reset" onClick={() => clearSearch()}>
                Clear
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
                                <option value="" selected>Please choose one</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Malayalam">Malayalam</option>
                            </select>
                    </label>
                    <label className="search-label">
                            Genre
                            <select className="search-input" name="genre" onChange={(event) => setGenre(event.target.value)}>
                                <option value="" selected>Please choose one</option>
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
                    <label className="search-label">
                        Year
                        <input type = "number" className="search-input" value={year} onChange={(event) => setYear(event.target.value)}/>
                    </label>
                    <button className="form-button" type="submit">
                        Search
                    </button>
                    <button className="form-button" type="reset" onClick={() => clearSearch()}>
                        Clear
                    </button>
                </form>
            </div>
        </div>
    );
}