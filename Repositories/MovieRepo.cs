using GoodFilms.Models.Response;
using GoodFilms.Models.Request;
using GoodFilms.Models;
using GoodFilms.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace GoodFilms.Repositories
{
    public interface IMovieRepo
    {
        public MovieListResponse getLatestMovieList();
        public MovieListResponse getBestMovieList();
        public MovieListResponse getWorstMovieList();
        public Movies AddMovie (MovieRequest create);
        public MovieListResponse getLanguageMovieList(string lang);
        public MovieListResponse getGenreMovieList(string genre);
        public MovieListResponse getSearchMovieList(MovieRequest searchMovie);
        public Movies UpdateLike(int Id);
        public Movies UpdateDislike(int Id);
        public Movies UpdateMovie(Movies movieToUpdate);
        public Movies getMovieById(int Id);
        public Movies DeleteMovie(int Id);
    }
    public class MovieRepo : IMovieRepo
    {
        private readonly ApplicationDbContext _context;
        public MovieRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public MovieListResponse getLatestMovieList()
        {
            MovieListResponse latestMovieList = new MovieListResponse();
            latestMovieList.MovieList = _context.Movies
                                                .OrderByDescending(m => m.ReleaseDate)
                                                .Take(5)
                                                .ToList();
            return latestMovieList;
        }

        public MovieListResponse getBestMovieList()
        {
            MovieListResponse bestMovieList = new MovieListResponse();
            bestMovieList.MovieList = _context.Movies
                                                .OrderByDescending(m => m.Likes)
                                                .Take(5)
                                                .ToList();
            return bestMovieList;
        }

        public MovieListResponse getWorstMovieList()
        {
            MovieListResponse worstMovieList = new MovieListResponse();
            worstMovieList.MovieList = _context.Movies
                                                .OrderByDescending(m => m.Dislikes)
                                                .Take(5)
                                                .ToList();
            return worstMovieList;
        }
        public Movies AddMovie(MovieRequest create)
        {
            var insertResponse =
                _context
                    .Movies
                    .Add(new Movies
                    {
                        Title = create.Title,
                        Language = create.Language,
                        Genre = create.Genre,
                        Director = create.Director,
                        Actor = create.Actor,
                        Actress = create.Actress,
                        ReleaseDate = create.ReleaseDate,
                        Year = create.ReleaseDate.Year,
                        Likes = 0,
                        Dislikes = 0
                    });
            _context.SaveChanges();

            return insertResponse.Entity;
        }
        public MovieListResponse getLanguageMovieList(string lang)
        {
            MovieListResponse languageMovieList = new MovieListResponse();
            languageMovieList.MovieList = _context.Movies
                                                .Where(m=>m.Language == lang)
                                                .OrderByDescending(m => m.Likes)
                                                .Take(10)
                                                .ToList();
            return languageMovieList;
        }

        public MovieListResponse getGenreMovieList(string genre)
        {
            MovieListResponse genreMovieList = new MovieListResponse();
            genreMovieList.MovieList = _context.Movies
                                                .Where(m=>m.Genre == genre)
                                                .OrderByDescending(m => m.Likes)
                                                .Take(10)
                                                .ToList();
            return genreMovieList;
        }

        public MovieListResponse getSearchMovieList(MovieRequest searchMovie)
        {
            MovieListResponse searchMovieList = new MovieListResponse();
            var movies = _context.Movies.AsQueryable();
            if (!String.IsNullOrEmpty(searchMovie.Title)){
                movies = movies.Where(m=>m.Title.ToLower().Contains(searchMovie.Title.ToLower()));
            }
            if (!String.IsNullOrEmpty(searchMovie.Language)){
                movies = movies.Where(m=>m.Language == searchMovie.Language);
            }
            if (!String.IsNullOrEmpty(searchMovie.Genre)){
                movies = movies.Where(m=>m.Genre == searchMovie.Genre);
            }
            if (!String.IsNullOrEmpty(searchMovie.Director)){
                movies = movies.Where(m=>m.Director.ToLower().Contains(searchMovie.Director.ToLower()));
            }
            if (!String.IsNullOrEmpty(searchMovie.Actor)){
                movies = movies.Where(m=>m.Actor.ToLower().Contains(searchMovie.Actor.ToLower()));
            }
            if (!String.IsNullOrEmpty(searchMovie.Actress)){
                movies = movies.Where(m=>m.Actress.ToLower().Contains(searchMovie.Actress.ToLower()));
            }
            if ((searchMovie.ReleaseDate) != default(DateTime)){
                movies = movies.Where(m=>m.ReleaseDate == searchMovie.ReleaseDate);
            }
            if ((searchMovie.Year) != 0){
                movies = movies.Where(m=>m.Year == searchMovie.Year);
            }
            movies = movies.OrderByDescending(m => m.Likes);
            searchMovieList.MovieList = movies.ToList();
            return searchMovieList;
        }
        
        public Movies UpdateLike(int Id)
        {

            var movieToLike = _context.Movies
                            .Where(m=>m.Id == Id)
                            .SingleOrDefault();
            movieToLike.Likes = movieToLike.Likes + 1;
            var likedMovie =  _context.Update<Movies>(movieToLike);
            _context.SaveChanges();
            return likedMovie.Entity;
        }

        public Movies UpdateDislike(int Id)
        {

            var movieToDislike = _context.Movies
                            .Where(m=>m.Id == Id)
                            .SingleOrDefault();
            movieToDislike.Dislikes = movieToDislike.Dislikes + 1;
            var dislikedMovie =  _context.Update<Movies>(movieToDislike);
            _context.SaveChanges();
            return dislikedMovie.Entity;
        }
        public Movies UpdateMovie(Movies movieToUpdate)
        {
            movieToUpdate.Year = movieToUpdate.ReleaseDate.Year;
            var updatedMovie =  _context.Update<Movies>(movieToUpdate);
            _context.SaveChanges();
            return updatedMovie.Entity;
        }

        public Movies getMovieById(int Id)
        {

            var movieDetails = _context.Movies
                            .Where(m=>m.Id == Id)
                            .SingleOrDefault();
            return movieDetails;
        }

        public Movies DeleteMovie(int Id)
        {

            var movieToDelete = _context.Movies
                            .Where(m=>m.Id == Id)
                            .SingleOrDefault();
            var deletedMovie =  _context.Remove<Movies>(movieToDelete);
            _context.SaveChanges();
            return deletedMovie.Entity;
        }
    }
}