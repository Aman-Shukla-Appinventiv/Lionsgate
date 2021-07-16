const API_KEY = '8a869e5388c886cce43c72cff4147cbc';
export const baseUrl = 'https://image.tmdb.org/t/p/w500';

export const request_paths = {
  searchMovies:
    'https://api.themoviedb.org/3/search/movie?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&query=fast&page=1&include_adult=false',
  searchShows:
    'https://api.themoviedb.org/3/search/tv?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1&query=game%20of%20thrones&include_adult=false',
  moviesAnTvShows:
    'https://api.themoviedb.org/3/search/multi?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&query=fast%20and%20furious&page=1&include_adult=false',
  configuration:
    'https://api.themoviedb.org/3/configuration?api_key=8a869e5388c886cce43c72cff4147cbc',

  movie:
    'https://api.themoviedb.org/3/movie/${movie_id}?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US',

  adventureMovie:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=12',
  animationMovie:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=16',
  crimeMovie:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=80',
  dramaMovie:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=18',
  familyMovie:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10751',
  fantasyMovie:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=14',
  leatestmovies:
    'https://api.themoviedb.org/3/movie/latest?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US',
  nowplaying:
    'https://api.themoviedb.org/3/movie/now_playing?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1',
  popular:
    'https://api.themoviedb.org/3/movie/popular?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1',
  toprated:
    'https://api.themoviedb.org/3/movie/top_rated?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1',
  upcoming:
    'https://api.themoviedb.org/3/movie/upcoming?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1',

  recommended:
    'https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1',
  similar:
    'https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&page=1',

  trending:
    'https://api.themoviedb.org/3/trending/all/week?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US',
  actionMovies:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=28',
  comedyMovies:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=35',
  horrorMovies:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=27',
  romanceMovies:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10749',
  documentries:
    'https://api.themoviedb.org/3/discover/movie?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=99',

  moviesGener:
    'https://api.themoviedb.org/3/genre/movie/list?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US',

  adventure:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10759',
  animation:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=16',
  crime:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=80',
  drama:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=18',
  family:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10751',
  fantasy:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10765',
  mystery:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=9648',
  sciFi:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10765',
  reality:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10764',
  war: 'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=10768',
  western:
    'https://api.themoviedb.org/3/discover/tv?api_key=8a869e5388c886cce43c72cff4147cbc&with_genres=37',
};
export const HomeTitles = [
  "India's Top 10",
  "Recently added",
  "What Millennials Are Watching",
  "Binge Worthy Box Sets",
  "High Octane Action",
  "Lionsgate Play Originals",
  "Mystery Files",
  "Hot Flix",
  "Thrist of Quest",
  "Funny Side Up",
  "Spirit Realm",
  "Thrill Chills",
  "Drama",
  "Queendom",
]
export const Showtitles = [
  "Adventure",
  "Animation",
  "Crime",
  "sci-Fi",
  "Family",
  "Fantasy",
  "Drama",
  "Mystery",
  "Reality",
  "War",
  "Western",
  
]

