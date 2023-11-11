import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../interface/post';

const initialState: IPost = {
    post: null,
    // for user object
    error: null,
    loading: false,
    success: false, // for monitoring the registration process.
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getAllPostStart: (state) => {
            state.loading = true;
        },
        getAllPostSuccess: (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.success = true;
        },
        getAllPostFailure: (state) => {
            state.loading = true;
            state.success = false;
        },
        clearPost: (state) => {
            state.post = null;
        },
    },
});
export const { getAllPostStart, getAllPostSuccess, getAllPostFailure, clearPost } = postSlice.actions;

export default postSlice.reducer;
