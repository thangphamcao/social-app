import { createSlice } from '@reduxjs/toolkit';
import { IAUth } from '../../interface';

const initialState: IAUth = {
    user: {
        id: null,
        isAdmin: false,
        email: null,
        avatar: null,
        accessToken: null,
        displayName: null,
    }, // for user object
    error: null,
    loading: false,
    success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            (state.error = action.payload), (state.loading = false);
        },
        logOutStart: (state) => {
            state.loading = true;
            state.success = true;
        },
        logOutSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.success = true;
        },
        logOutFailure: (state, action) => {
            state.loading = true;
            state.error = action.payload;
            state.success = false;
        },

        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});
export const {
    loginStart,
    loginFailure,
    loginSuccess,
    logOutFailure,
    logOutStart,
    logOutSuccess,
    signUpStart,
    signUpFailure,
    signUpSuccess,
} = userSlice.actions;

export default userSlice.reducer;
