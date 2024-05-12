import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { conversationReducer } from "./conversation/conversation.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    conversation: conversationReducer,
});