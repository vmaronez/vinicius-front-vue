import axios from 'axios';

const http = axios.create({
    baseURL: 'http://vinicius-back.test/api',
});

export default http;

