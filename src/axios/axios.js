// axios.js
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status == 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
