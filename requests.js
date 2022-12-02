import API_KEY from "./apiKey";

export const MoviesRequests = [
  {
    id: 0,
    name: "Trending",
    url: `/trending/movie/day?api_key=${API_KEY}`,
  },
  {
    id: 1,
    name: "Netflix Original",
    url: `/discover/movie?api_key=${API_KEY}&with_networks=213`,
  },
  {
    id: 2,
    name: "Top Rated",
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  {
    id: 3,
    name: "Action",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  {
    id: 4,
    name: "Comedy",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  {
    id: 5,
    name: "Horror",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  {
    id: 6,
    name: "Romance",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  {
    id: 7,
    name: "Documentary",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  },
  {
    id: 8,
    name: "Animation",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  },
  {
    id: 9,
    name: "Crime",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  },
  {
    id: 10,
    name: "Drama",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  },
  {
    id: 11,
    name: "Family",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  },
  {
    id: 12,
    name: "Mystery",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  {
    id: 13,
    name: "Kids",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10762`,
  },
  {
    id: 14,
    name: "Science Fiction",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  },
  {
    id: 15,
    name: "History",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
  },
  {
    id: 16,
    name: "Western",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  },
  {
    id: 17,
    name: "War",

    url: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
  },
  {
    id: 18,
    name: "Adventure",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  },
];

export const TvRequests = [
  {
    id: 0,
    name: "Trending",
    url: `/trending/tv/day?api_key=${API_KEY}`,
  },

  {
    id: 1,
    name: "Netflix Original",
    url: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  },
  {
    id: 2,
    name: "Top Rated",
    url: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  },

  {
    id: 3,
    name: "Comedy",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  },
  {
    id: 4,
    name: "Romance",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  },
  {
    id: 5,
    name: "Documentary",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
  },
  {
    id: 6,
    name: "Popularity",
    url: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  },
  {
    id: 7,
    name: "Animation",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
  },
  {
    id: 8,
    name: "Crime",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
  },
  {
    id: 9,
    name: "Drama",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
  },
  {
    id: 10,
    name: "Family",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
  },
  {
    id: 11,
    name: "Mystery",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
  },
  {
    id: 12,
    name: "Kids",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
  },
  {
    id: 13,
    name: "Sci-Fi & Fantasy",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
  },
  {
    id: 14,
    name: "War & Politics",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10767`,
  },
  {
    id: 15,
    name: "Western",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=37`,
  },
  {
    id: 16,
    name: "Action & Adventure",
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  },
];
