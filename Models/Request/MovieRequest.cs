using GoodFilms.Models;
using System;


namespace GoodFilms.Models.Request
{
    public class MovieRequest
    {
        public string Title { get; set; }
        public string Language { get; set; } 
        public string Genre { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public string Actress { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Year { get; set; }
       
    }

}