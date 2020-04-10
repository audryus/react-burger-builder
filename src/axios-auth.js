import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIRE_BASE_AUTH
});

export default instance;