using GoodFilms.Models;
using System;


namespace GoodFilms.Models.Response
{
    public class MovieResponse
    {
        private readonly Movies _movies;

        public MovieResponse(Movies movies)
        {
            _movies = movies;
        }
        public int Id => _movies.Id;
        public string Title => _movies.Title;
        public string Language  => _movies.Language; 
        public string Genre => _movies.Genre;
        public string Director => _movies.Director;
        public string Actor => _movies.Actor;
        public string Actress => _movies.Actress;
        public DateTime ReleaseDate => _movies.ReleaseDate;
        public int Year => _movies.Year;
        public int Likes => _movies.Likes;
        public int Dislikes => _movies.Dislikes;
        
    }

}