import axios from 'axios';

export const mock = axios.create({
  baseURL: 'http://chalmers'
});

export const nomenclador = axios.create({
  baseURL: process.env.REACT_APP_NOMENCLADOR_URI
});

export default axios.create({
  baseURL: 'http://chalmers'
});
