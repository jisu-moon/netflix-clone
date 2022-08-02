import axios from 'axios';

const API_KEY = '9a11d3415c984ae77df020c63907ea0e';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface IMoviesResults {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
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

export const getMovies = () => {
  return axios
    .get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`,
    )
    .then(res => res.data);
};
