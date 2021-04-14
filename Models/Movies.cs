using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoodFilms.Models
{
    // public enum Language {
    //     Hindi,
    //     Tamil,
    //     Malayalam

    // }

    // public enum Genre {
    //     Thriller,
    //     Comedy,
    //     Romance,
    //     Drama
    // }
    public class Movies
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Language { get; set; } 
        public string Genre { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public string Actress { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Year { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
    }
}