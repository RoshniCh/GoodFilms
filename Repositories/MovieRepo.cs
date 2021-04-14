using GoodFilms.Models.Response;
using GoodFilms.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GoodFilms.Repositories
{
    public interface IMovieRepo
    {
        public MovieListResponse getLatestMovieList();
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

    }
}