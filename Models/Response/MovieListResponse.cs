using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace GoodFilms.Models.Response
{
    public class MovieListResponse
    {
        public List<Movies> MovieList { get; set; }
        public int TotalNumberOfMovies { get; set; }
    }
}