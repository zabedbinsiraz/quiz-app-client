import { createSlice } from "@reduxjs/toolkit";

const initialComments = {
    comments:[
        {id:1,comment:'Beautiful'},
        {id:2,comment:'Excellent'}
    ]
};

export const commentSlice = createSlice({
    name:"comments",
    initialState:initialComments,
    reducers:{
        showComments:(state)=>state,
        addComment:(state,action)=>{
            state.comments.push(action.payload);
        },
        deleteComment:(state,action)=>{
            const id = action.payload;
            state.comments = state.comments.filter((comment)=>comment.id!==id);
        },
        updateComment:(state,action)=>{
            const {id,comment}=action.payload;
            const isBookExist = state.comments.filter((comment)=>comment.id===id);
            if(isBookExist){
                isBookExist[0].comment=comment;
            }
        }
    }

})

export const {showComments,deleteComment,updateComment,addComment} = commentSlice.actions;
export default commentSlice.reducer;