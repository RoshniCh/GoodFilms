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

        [HttpPost("UpdateLike/{Id}")]
        public Movies UpdateLikeMovie([FromRoute] int Id)
        {
            Movies likedMovie = _movies.UpdateLike(Id);
            return likedMovie;
        } 
        

        [HttpPost("UpdateDislike/{Id}")]
        public Movies UpdateDislikeMovie([FromRoute] int Id)
        {
            Movies dislikedMovie = _movies.UpdateDislike(Id);
            return dislikedMovie;
        } 

        [Authorize]
        [HttpPost("UpdateMovie")]
        public ActionResult UpdateMovie([FromBody] Movies movieToUpdate)
        {
            var updatedMovie = _movies.UpdateMovie(movieToUpdate);
            return Ok(updatedMovie);
        }

        [HttpGet("MovieById/{id}")]
        public ActionResult<Movies> MovieById([FromRoute] int id)
        {
            Movies movieDetails = _movies.getMovieById(id);
            return movieDetails;
        } 


        [HttpPost("DeleteMovie/{Id}")]
        public Movies DeleteMovie([FromRoute] int Id)
        {
            Movies deletedMovie = _movies.DeleteMovie(Id);
            return deletedMovie;
        } 
    }
}