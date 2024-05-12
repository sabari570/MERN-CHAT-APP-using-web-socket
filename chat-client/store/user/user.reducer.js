import { createSlice } from "@reduxjs/toolkit";

const INITIAL_USER_DATA = {
    currentUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_USER_DATA,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;