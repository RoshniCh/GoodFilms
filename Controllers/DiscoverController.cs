using System;
using Microsoft.AspNetCore.Mvc;
using GoodFilms.Models;
using GoodFilms.Models.Response;
using GoodFilms.Models.Request;
using GoodFilms.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace GoodFilms.Controllers {
    [Route("Discover")]
    public class DiscoverController : ControllerBase {
        private readonly IMovieRepo _movies;
        public DiscoverController(IMovieRepo movies)
        {
            _movies = movies;
        }
        [HttpGet("Language/{lang}")]
        public ActionResult<MovieListResponse> LanguageMovieList([FromRoute] string lang)
        {
            MovieListResponse languageMovieList = _movies.getLanguageMovieList(lang);
            return languageMovieList;
        } 

        [HttpGet("Genre/{genre}")]
        public ActionResult<MovieListResponse> GenreMovieList([FromRoute] string genre)
        {
            MovieListResponse genreMovieList = _movies.getGenreMovieList(genre);
            return genreMovieList;
        } 
        
        
    }
}