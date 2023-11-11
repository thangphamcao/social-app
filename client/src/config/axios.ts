import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { IDecoded } from './../interface/index';
import { loginSuccess } from '../redux/UserSlice';
import { store } from '../redux/store';

export const baseURL = import.meta.env.VITE_API_KEY;

const API = axios.create({
    baseURL: baseURL,
});

const getToken = () => {
    return store.getState().user.user?.accessToken;
};

API.interceptors.request.use(
    async (config) => {
        const user = store.getState().user.user;
        const dispatch = store.dispatch;

        const token = getToken() as string;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        const now = new Date();
        const decoded: IDecoded = jwtDecode(token);

        if (decoded.exp < now.getTime() / 1000 + 10) {
            console.log('JWT Expired');
            const data = await axios.get('http://localhost:5000/api/v1/auth/token', { withCredentials: true });
            console.log({ newToken: data.data.accessToken, user: user });
            dispatch(loginSuccess({ ...user, accessToken: data.data.accessToken }));
            config.headers.Authorization = `Bearer ${user?.accessToken as string}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

// API.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalConfig = error.config;
//         console.log('Access token expired');
//         if (error.response && error.response.status === 500) {
//             try {
//                 console.log('get new access token');
//                 const data = await axios.get('http://localhost:5000/api/v1/auth/token', { withCredentials: true });

//                 const user = store.getState().user.user;
//                 const dispatch = store.dispatch;
//                 dispatch(loginSuccess({ ...user, accessToken: data.data.accessToken }));

//                 originalConfig.headers['Authorization'] = `Bearer ${data.data.accessToken}`;

//                 return API(originalConfig);
//             } catch (err) {
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     },
// );

export default API;
