import { key_token } from './../constant';
import axios from "axios";
import process from "process";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
    withCredentials: true,
});

api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem(key_token);

        if (token) config.headers['Authorization'] = 'Bearer ' + token;
        
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default api
