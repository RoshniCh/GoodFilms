using System;
using Microsoft.AspNetCore.Mvc;
using GoodFilms.Models;
using GoodFilms.Models.Response;
using GoodFilms.Models.Request;
using GoodFilms.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace GoodFilms.Controllers {
    [Route("Search")]
    public class SearchController : ControllerBase {
        private readonly IMovieRepo _movies;
        public SearchController(IMovieRepo movies)
        {
            _movies = movies;
        }
        [HttpGet("")]
        public ActionResult<MovieListResponse> SearchMovieList([FromQuery] MovieRequest searchMovie)
        {
            MovieListResponse searchMovieList = _movies.getSearchMovieList(searchMovie);
            return searchMovieList;
        } 
       
    }
}