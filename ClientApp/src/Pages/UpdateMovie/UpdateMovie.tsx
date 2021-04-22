import React, { FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateMovie, getMovieById } from "../../Api/apiClient";
import './UpdateMovie.scss';

export function UpdateMovie() : JSX.Element {
    type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [actor, setActor] = useState("");
    const [actress, setActress] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [year, setYear] = useState("");
    const [likes, setLikes] = useState("");
    const [dislikes, setDislikes] = useState("");

    const [status, setStatus] = useState<FormStatus>("READY");

    useEffect(() => {
        getMovieById(parseInt(id))
        .then(data => {
            setTitle(data.title);
            setLanguage(data.language);
            setGenre(data.genre);
            setDirector(data.director);
            setActor(data.actor);
            setActress(data.actress);
            setReleaseDate(data.releaseDate);
            setYear(data.year.toString());
            setLikes(data.likes.toString());
            setDislikes(data.dislikes.toString());
        });
    }, []);

    function submitForm(event: FormEvent) {
        event.preventDefault();
        setStatus("SUBMITTING");
        updateMovie({
          id: parseInt(id),
          title,
          language,
          genre,
          director,
          actor,
          actress,
          releaseDate,
          year: parseInt(year),
          likes: parseInt(likes),
          dislikes: parseInt(dislikes),
        })
          .then(() => setStatus("FINISHED"))
          .catch(() => setStatus("ERROR"));
      }
    
    if (status === "FINISHED") {
    return (
        <div className="content-container">
        <p className="body-text">Form submitted successfully!</p>
        <p className="body-text">Your movie is now updated!</p>
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
                <h2 className="sub-heading"> Update movie details</h2>
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
                            <select className="form-input" name="language" onChange={(event) => setLanguage(event.target.value)}>
                                if (language == "Hindi") {
                                    <option value="Hindi" selected>Hindi</option>
                                } else {
                                    <option value="Hindi">Hindi</option>
                                }
                                if (language == "Tamil") {
                                    <option value="Tamil" selected>Tamil</option>
                                } else {
                                    <option value="Tamil">Tamil</option>
                                }
                                if (language == "Malayalam") {
                                    <option value="Malayalam" selected>Malayalam</option>
                                } else {
                                    <option value="Malayalam">Malayalam</option>
                                }
                        {/* <option value='Hindi' <?php echo ($valuable == 'bottomValue')?'selected':''; ?>>Three</option> */}
                            </select>
                        </label>
                        </div>
                        <div className="col">
                        <label className="form-label">
                            Genre
                            <select className="form-input" name="genre" onChange={(event) => setGenre(event.target.value)} required>
                                <option value="" disabled selected>Please choose one</option>
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
                        <input className="form-input" value={releaseDate} onChange={(event) => setReleaseDate(event.target.value)} required/>
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
                        Update Movie
                    </button>
                </form>
            </div>
        </div>
    )}