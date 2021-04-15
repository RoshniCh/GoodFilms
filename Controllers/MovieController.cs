using System;
using Microsoft.AspNetCore.Mvc;
using GoodFilms.Models;
using GoodFilms.Models.Response;
using GoodFilms.Models.Request;
using GoodFilms.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace GoodFilms.Controllers {
    [Route("Discover")]
    public class LanguageController : ControllerBase {
        private readonly IMovieRepo _movies;
        public LanguageController(IMovieRepo movies)
        {
            _movies = movies;
        }
        [HttpGet("Language/{lang}")]
        public ActionResult<MovieListResponse> LanguageMovieList([FromRoute] string lang)
        {
            MovieListResponse latestMovieList = _movies.getLanguageMovieList(lang);
            return latestMovieList;
        } 
        
    }
}