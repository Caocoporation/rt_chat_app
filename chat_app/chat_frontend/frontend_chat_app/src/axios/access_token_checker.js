import axios  from 'axios';
// import { request } from 'websocket';
import jwt_decode from 'jwt-decode';

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        // if there is access token => set the Authorization : 'JWT' + .....
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,

        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (request) => {
        console.log("Hear is the request");
        console.log(request);
        
        return request;
    },

    async function (error) {
        console.log(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },

    async function (error) {
        const originalRequest = error.config;

        console.log(originalRequest);

        if (originalRequest) {
            if ( originalRequest.headers['Authorization'] === null ) {
                console.log("no header");
                window.location.href = '/login'; 
            }

            var accessToken = originalRequest.headers.Authorization.split(" ")[1];
            var payload = jwt_decode(accessToken);
            const now = Math.round(Date.now() / 1000);

            if (payload.exp <= now ) {
                const refreshToken = localStorage.getItem('refresh_token');

                // console.log(jwt_decode(refreshToken));

                if (refreshToken !== 'undefined' || refreshToken !== null) {
                    console.log("True");
                    if (jwt_decode(refreshToken).exp >= now ) {
                        console.log("True");
                        return axiosInstance
                            // send a post request to url /token/refresh to get refresh token 
                        .post ('/api/token/refresh/', {refresh: refreshToken})
                        .then ( (response) => {
                            console.log(response);
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', refreshToken);

                            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

                            return axiosInstance(originalRequest);
                        })

                        .catch ( (err) => {
                            console.log(err);
                        });
                    }

                    else { 
                        console.log('Refresh token is expired.');
                        window.location.href = '/login'; 
                    };
                }

                else { 
                    console.log('Refresh token is invalid.');
                    window.location.href = '/login'; 
                };
            }

            return Promise.reject(error);
        }
    }
);

export default axiosInstance;



