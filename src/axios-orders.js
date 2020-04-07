import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-complete-guide-57bf6.firebaseio.com/'
});

export default instance;