import axios from 'axios';
import API from '../config/axios';
import { baseURL } from '../config/axios';
// API USER
// export const refreshToken = async () => {
//     const { data } = await API.get('/api/v1/auth/token', {
//         withCredentials: true,
//     });
//     return data;
// };
export const logIn = async (input: { email: string; password: string }) => {
    const { data } = await axios.post(`${baseURL}/api/v1/auth/login`, input, { withCredentials: true });
    return data;
};

export const signUp = async (input: { name: string; email: string; password: string }) => {
    const { data } = await axios.post(`${baseURL}/api/v1/auth/register`, input);
    return data;
};

export const getUser = async (id: string) => {
    const url = '/api/v1/user/' + id;
    console.log(url);
    const { data } = await API.get(url);
    return data;
};

export const logOutUser = async (id: string) => {
    const { data } = await API.post(
        '/api/v1/auth/logout',
        { id: id },
        {
            withCredentials: true,
        },
    );
    return data;
};

// API POST

export const getAllPost = async () => {
    const { data } = await API.get('/api/v1/post');
    return data;
};

export const likePost = async (id: string) => {
    const { data } = await API.put(`/api/v1/post/like/${id}`);
    return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPost = async (formData: any) => {
    const { data } = await API.post(`/api/v1/post/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};
