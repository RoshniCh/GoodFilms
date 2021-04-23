import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { submitMovie } from "../../Api/apiClient";
import './AddMovie.scss';

export function AddMovie() : JSX.Element {
    type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("Hindi");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [actor, setActor] = useState("");
    const [actress, setActress] = useState("");
    const [releasedate, setReleasedate] = useState("");

    const [status, setStatus] = useState<FormStatus>("READY");

    function submitForm(event: FormEvent) {
        event.preventDefault();
        setStatus("SUBMITTING");
        submitMovie({
          title,
          language,
          genre,
          director,
          actor,
          actress,
          releasedate,
        })
          .then(() => setStatus("FINISHED"))
          .catch(() => setStatus("ERROR"));
      }

      function clearSearch() {
        setTitle("");
        setLanguage("");
        setGenre("");
        setDirector("");
        setActor("");
        setActress("");
        setReleasedate("");
    }
    
    if (status === "FINISHED") {
    return (
        <div className="content-container">
        <p className="body-text">Form submitted successfully!</p>
        <p className="body-text">Your movie is now added!</p>
        <button className="form-button" onClick={() => setStatus("READY")}>Submit another movie?</button>
        <br></br>
        <Link to="/">Return to Homepage?</Link>
        </div>
    );
    } 
    return (
        <div>
            <div className="content-sub-container">
            <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
            </div>
            <div className="content-sub-container">
                <h2 className="sub-heading"> Add a Movie</h2>
                <form onSubmit={submitForm}>
                    <div className="row">
                    <div className="col">
                    <label className="form-label">
                        Movie Title
                        <input className="form-input" value={title} onChange={(event) => setTitle(event.target.value)} required/>
                    </label>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <label className="form-label">
                            Langauge
                            <select className="form-input" name="language" onChange={(event) => setLanguage(event.target.value)} required>
                                <option value="" selected>Please choose one</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Malayalam">Malayalam</option>
                            </select>
                        </label>
                        </div>
                        <div className="col">
                        <label className="form-label">
                            Genre
                            <select className="form-input" name="genre" onChange={(event) => setGenre(event.target.value)} required>
                                <option value="" selected>Please choose one</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </label>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <label className="form-label">
                        Director
                        <input className="form-input" value={director} onChange={(event) => setDirector(event.target.value)} required/>
                    </label>
                    </div>
                    <div className="col">
                    <label className="form-label">
                        Release Date
                        <input type = "date" className="form-input" value={releasedate} onChange={(event) => setReleasedate(event.target.value)} required/>
                    </label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <label className="form-label">
                        Lead Actor
                        <input className="form-input" value={actor} onChange={(event) => setActor(event.target.value)} required/>
                    </label>
                    </div>
                    <div className="col">
                    <label className="form-label">
                        Lead Actress
                        <input className="form-input" value={actress} onChange={(event) => setActress(event.target.value)} required/>
                    </label>
                    </div>
                    </div><br/>
                    <button className="form-button" type="submit">
                        Submit Movie
                    </button>
                    <button className="form-button" type="reset" onClick={() => clearSearch()}>
                        Clear
                    </button>
                </form>
            </div>
        </div>
    )}