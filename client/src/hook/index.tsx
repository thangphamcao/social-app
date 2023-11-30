// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    commentPost,
    createPost,
    deleteCommentPost,
    getAllPost,
    getCommentPost,
    likePost,
    updateCommentPost,
} from '../utils';
import { IComment } from '../interface/post';

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// GET ALL POST
const useGetAllPost = () => {
    return useQuery(['posts'], getAllPost, {
        onSuccess: (res) => {
            return res.posts;
        },
        select: (res) => {
            return res.posts;
        },
        onError: () => {},
    });
};

// LIKE POST
const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => likePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'], exact: true });
        },
    });
};

// CREATE POST
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCreatePost = (close: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => createPost(formData),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
            close();
        },
    });
};

export interface ICommentAPI {
    formData: FormData;
    id: string;
}

// const useGetCommentPost = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (id: { commentID: string; postID: string }) => getCommentPost(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries('posts');
//         },
//     });
// };

const useGetCommentPost = (commentID: string, postID: string, onSuccess: (data: { data: IComment }) => void) => {
    return useQuery(['comment posts', commentID, postID], () => getCommentPost(commentID, postID), {
        onSuccess: onSuccess,
        enabled: false,

        onError: () => {},
    });
};

const useCommentPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICommentAPI) => commentPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

const useDeleteCommentPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: { commentID: string; postID: string }) => deleteCommentPost(id),
        onSuccess: () => {
            console.log('Successs');

            queryClient.invalidateQueries('posts');
        },
    });
};

const useUpdateCommentPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { commentID: string; postID: string; update: { comment: string; image: string } }) =>
            updateCommentPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export {
    useGetAllPost,
    useLikePost,
    useCreatePost,
    useCommentPost,
    useDeleteCommentPost,
    useGetCommentPost,
    useUpdateCommentPost,
};
