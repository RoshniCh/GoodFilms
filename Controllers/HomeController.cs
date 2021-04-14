using System;
using System.Linq;
using GoodFilms.Models;
using GoodFilms.Models.Response;
using GoodFilms.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace GoodFilms.Controllers 
{
    [Route ("Home")]
    public class HomeController : ControllerBase
    {
        private readonly IMovieRepo _movies;
        public HomeController(IMovieRepo movies)
        {
            _movies = movies;
        }
        [HttpGet("LatestMovieList")]
        public ActionResult<MovieListResponse> LatestReleases()
        {
            MovieListResponse latestMovieList = _movies.getLatestMovieList();
            return latestMovieList;
        } 
    }
}