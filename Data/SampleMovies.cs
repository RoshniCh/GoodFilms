using System.Collections.Generic;
using System.Linq;
using GoodFilms.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System; 


namespace GoodFilms.Data
{
    public static class SampleMovies
    {
        public static int NumberOfMovies = 18;
        private static IList<IList<string>> _data = new List<IList<string>>
        {
            new List<string> { "Master","Tamil", "Thriller","Lokesh Kanagaraj", "Vijay","Malavika", "2021-02-15", "2021"},
            new List<string> { "Vishva roopam", "Tamil","Comedy","Kamal Hassan", "Kamal Hassan","Pooja", "2019-02-15", "2019"},
            new List<string> { "Manmadan Ambu","Tamil","Comedy", "Ravikuman", "Kamal Hassan", "Trisha", "2010-02-15", "2010"},
            new List<string> { "Enthiran","Tamil", "Romance", "Sankar", "Rajani", "Aishwarya", "2020-02-15", "2020"},
            new List<string> { "Asuran","Tamil","Drama", "Vetrimaaran", "Dhanush","Manju", "2020-02-15", "2020"},
            new List<string> { "Petta","Tamil", "Drama", "Karthik Subbaraj", "Rajani", "Simran", "2020-02-15", "2020"},
            new List<string> { "Uttama Villian","Tamil","Drama", "Ramesh Aravind", "Kamal Hassan", "Pooja", "2004-02-15", "2004"},
            new List<string> { "Irul","Malayalam", "Thriller", "Naseef", "Fahadh","Darshana", "2021-04-01", "2021"},
            new List<string> { "Joji","Malayalam", "Comedy", "Dileesh Pothan", "Fahadh","Unnimaya", "2021-04-17", "2021"},
            new List<string> { "Priest","Malayalam","Comedy", "Josh", "Mammooty","Manju", "2021-02-15", "2021"},
            new List<string> { "Charlie","Malayalam","Drama", "Martin", "Dulquer","Parvathy", "2015-02-15", "2015"},
            new List<string> { "Bangalore Days","Malayalam","Romance", "Anjali Menin", "Fahadh","Nazriya", "2014-02-15", "2014"},
            new List<string> { "Piku","Hindi","Comedy", "Shoojit Sircar", "Amitabh", "Deepika", "2018-02-15", "2018"},	
            new List<string> { "Happy New Year","Hindi", "Comedy", "Karan Johar", "Shah Rukh Khan","Deepika", "2020-02-15", "2020"},
            new List<string> { "Veer Zaara","Hindi","Romance", "Yash Chopra", "Shah Rukh Khan", "Preeti Zinta", "2004-02-15", "2004"},
            new List<string> { "Dil","Hindi","Romance", "Indra Kumar", "Amir Khan","Madhuri", "1990-07-15", "1990"},
            new List<string> { "Dil Se","Hindi","Romance", "Mani Ratnam", "Shah Rukh Khan", "Preeti Zinta", "2004-02-15", "2004"},
            new List<string> { "Teen","Hindi","Drama", "Aniruddha", "Amitabh", "Taapsee", "2018-02-15", "2018"},	
        };
        public static IEnumerable<Movies> GetMovies()
        {
            return Enumerable.Range(0, NumberOfMovies).Select(CreateRandomMovie);
        }
        // public static Language FindLanguage(int l)
        // {
        //     if (l==0)
        //     {
        //         return Language.Hindi;
        //     } else if (l==1) 
        //     {
        //         return Language.Tamil;
        //     } else
        //     {
        //         return Language.Malayalam;
        //     }
        // }
        // public static Genre FindGenre(int g)
        // {
        //     if (g==0)
        //     {
        //         return Genre.Thriller;
        //     } else if (g==1) 
        //     {
        //         return Genre.Comedy;
        //     } else if (g==2)
        //     {
        //         return Genre.Romance;
        //     } else 
        //     {
        //         return Genre.Drama;
        //     }
        // }
        private static Movies CreateRandomMovie(int index)
        {
            Random rnd = new Random();
            return new Movies
            {
                Title = _data[index][0],
                // Language = FindLanguage(Int32.Parse(_data[index][1])),
                // Genre = FindGenre(Int32.Parse(_data[index][2])),
                Language = _data[index][1],
                Genre = _data[index][2],
                Director =  _data[index][3],
                Actor =  _data[index][4],
                Actress =  _data[index][5],
                ReleaseDate = DateTime.Parse(_data[index][6]),
                Year = Int32.Parse(_data[index][7]),
                Likes = rnd.Next(1,100),
                Dislikes = rnd.Next(1,10),
            };
        }
    }
}

