import { createSlice } from "@reduxjs/toolkit";

const INITIAL_COVERSATION = {
    selectedConversation: null,
    messages: [],
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: INITIAL_COVERSATION,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    }
});

export const {setSelectedConversation, setMessages } = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;