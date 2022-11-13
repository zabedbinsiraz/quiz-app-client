import { createSlice } from "@reduxjs/toolkit";

const initialBooks = {
    books:[
        {id:1,name:'ComicBook'},
        {id:2,name:'Novel'}
    ]
};

export const bookSlice = createSlice({
    name:"books",
    initialState:initialBooks,
    reducers:{
        showBooks:(state)=>state,
        addBook:(state,action)=>{
            state.books.push(action.payload);
        },
        deleteBook:(state,action)=>{
            const id = action.payload;
            state.books = state.books.filter((book)=>book.id!==id);
        },
        updateBook:(state,action)=>{
            const {id,name}=action.payload;
            const isBookExist = state.books.filter((book)=>book.id===id);
            if(isBookExist){
                isBookExist[0].name=name;
            }
        }
    }

})

export const {showBooks,deleteBook,updateBook,addBook} = bookSlice.actions;
export default bookSlice.reducer;