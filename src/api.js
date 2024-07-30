import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const login = async (email, password) => {
  return await api.post('/users/login', { email, password });
};

export const fetchMovies = async (page, limit) => {
  return await api.get(`/movies?page=${page}&limit=${limit}`);
};

export const fetchMovieById = async (id) => {
  return await api.get(`/movies/${id}`);
};

export const createMovie = async (movieData) => {
  debugger;
  return await api.post('/movies', movieData, {headers: {'Content-Type': 'multipart/form-data',}});
};

export const updateMovie = async (id, movieData) => {
  return await api.patch(`/movies/${id}`, movieData, {headers: {'Content-Type': 'multipart/form-data',}});
};