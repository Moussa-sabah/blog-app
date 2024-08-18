

import {createSlice} from '@reduxjs/toolkit'

const CommentSlice = createSlice({

  name:'comment',
  initialState:{
  comments:[],
  },
  reducers:{
    setComments(state,action){
      state.comments = action.payload
    },
    deleteComment(state,action){
      state.comments = state.comments.filter(c=> c._id !== action.payload)
    }
  }
})


const commentReducer = CommentSlice.reducer
const commentActions = CommentSlice.actions

export {commentReducer,commentActions}