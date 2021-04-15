using System;
using Microsoft.AspNetCore.Mvc;
using GoodFilms.Models;
using GoodFilms.Models.Response;
using GoodFilms.Models.Request;
using GoodFilms.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace GoodFilms.Controllers {
    [Route("Admin")]
    public class MovieController : ControllerBase {
        private readonly IMovieRepo _movies;
        public MovieController(IMovieRepo movies)
        {
            _movies = movies;
        }
        [Authorize]
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MovieRequest newMovie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = _movies.AddMovie(newMovie);

            var url = Url.Action("GetById", new { id = movie.Id });
            var movieCreated = new MovieResponse(movie);

            return Created(url, movieCreated);
        }
        
    }
}