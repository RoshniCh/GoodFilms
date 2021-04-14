using GoodFilms.Models.Response;
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

    }
}