import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './BookSlice';
import commentsReducer from './CommentSlice';

const store = configureStore({
    reducer:{
        booksReducer:booksReducer,
        commentsReducer:commentsReducer,
    }
})

export default store;