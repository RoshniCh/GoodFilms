using GoodFilms.Models.Response;
using GoodFilms.Models.Request;
using GoodFilms.Models;
using GoodFilms.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GoodFilms.Repositories
{
    public interface IMovieRepo
    {
        public MovieListResponse getLatestMovieList();
        public MovieListResponse getBestMovieList();
        public MovieListResponse getWorstMovieList();
        public Movies AddMovie (MovieRequest create);
        public MovieListResponse getLanguageMovieList(string lang);
        

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
        
    }
}