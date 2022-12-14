import axios from 'axios';

const API_KEY = '9a11d3415c984ae77df020c63907ea0e';
const BASE_URL = 'https://api.themoviedb.org/3';

interface IMoviesResults {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  adult: boolean;
  genre_ids: number[];
  name: string;
}
export interface IGetMovies {
  page: number;
  results: IMoviesResults[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
  genre_ids: number[];
}
export interface IGenres {
  genres: [
    {
      id: number;
      name: string;
    },
  ];
}
export interface IVideo {
  id: number;
  results: [
    {
      key: string;
    },
  ];
}

export const getTopMovies = () => {
  return axios
    .get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`,
    )
    .then(res => res.data);
};
export const getGenres = () => {
  return axios
    .get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR&page=1`,
    )
    .then(res => res.data);
};
export const getVideo = (id: number | '') => {
  return axios
    .get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`)
    .then(res => res.data);
};
export const getTrendMovie = () => {
  return axios
    .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`)
    .then(res => res.data);
};
export const getRatedMovie = () => {
  return axios
    .get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`)
    .then(res => res.data);
};
export const getNewMovie = () => {
  return axios
    .get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`)
    .then(res => res.data);
};
