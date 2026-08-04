import axios from "axios"
import { cacheSignal } from "react";

const BASE_URL = "http://localhost:7000/api/v1/users";

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

let getAccessToken = () => "";
let settAccessToken = () => {};

export const tokenHandler = (getter, setter) => {
    getAccessToken = getter;
    settAccessToken = setter;
}

authApi.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    //console.log(error)
    return Promise.reject(error);
});

let refreshing = false;
let q = [];

function resolveQueue(newToken) {
    q.forEach((cb) => cb(newToken));
    q = [];
}

export const refreshAccessToken = () => {
    if (refreshing) {
        return new Promise((resolve, reject) => {
            q.push((newToken) => {
                if (!newToken) return reject(new Error("Refresh failed"));
                resolve(newToken);
            });
        });
    }

    refreshing = true;
    return axios
        .post(`${BASE_URL}/refresh`, {}, { withCredentials: true })
        .then((res) => {
            const newAccessToken = res.data.newAccessToken;
            settAccessToken(newAccessToken);
            resolveQueue(newAccessToken);
            return newAccessToken;
        })
        .catch((error) => {
            settAccessToken("");
            resolveQueue("");
            throw error;
        })
        .finally(() => {
            refreshing = false;
        });
};

authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return authApi(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);