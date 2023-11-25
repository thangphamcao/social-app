// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { commentPost, createPost, getAllPost, likePost } from '../utils';

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

const useCommentPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICommentAPI) => commentPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export { useGetAllPost, useLikePost, useCreatePost, useCommentPost };
