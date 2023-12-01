import axios from 'axios';
import API from '../config/axios';
import { baseURL } from '../config/axios';
import { ICommentAPI } from '../hook';
// API USER

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

export const createPost = async (formData: FormData) => {
    const { data } = await API.post(`/api/v1/post/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const getCommentPost = async (commentID: string, postID: string) => {
    if (commentID === '' || postID === '') {
        return;
    }
    const { data } = await API.get(`/api/v1/post/comment/get/${postID}?id=${commentID}`);
    return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commentPost = async (req: ICommentAPI) => {
    console.log(req);

    const { data } = await API.post(`/api/v1/post/comment/${req.id.postID}`, req.formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const deleteCommentPost = async (id: { commentID: string; postID: string }) => {
    const { data } = await API.delete(`/api/v1/post/comment/delete/${id.postID}?id=${id.commentID}`);
    return data;
};

export const updateCommentPost = async (req: ICommentAPI) => {
    const { data } = await API.put(`/api/v1/post/comment/update/${req.id.postID}?id=${req.id.commentID}`, req.formData);
    return data;
};
