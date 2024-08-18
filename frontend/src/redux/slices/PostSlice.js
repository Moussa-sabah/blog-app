
import { createSlice } from '@reduxjs/toolkit'

const PostSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    postsCount: null,
    createLoading: false,
    isPostCreated: false,
    isPostDeleted:false,
    post: null,
  },

  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload
    },
    setCreateLoading(state) {
      state.createLoading = true
    },
    clearCreateLoding(state) {
      state.createLoading = false
    },
    setIsPostCreated(state) {
      state.isPostCreated = true
      state.createLoading = false
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false
    },
    setPost(state, action) {
      state.post = action.payload
    },
    setLike(state, action) {
      state.post.likes = action.payload.likes
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(p => p._id !== action.payload)
    },
    setIsPostDeleted(state){
      state.isPostDeleted = true
    },
    addComment(state, action) {
      state.post.comments.push(action.payload)
    },
    updateComment(state, action) {
      state.post.comments = state.post.comments.map(c =>
        c._id === action.payload._id ? action.payload : c
      )
    },
    deleteComment(state, action) {
      state.post.comments = state.post.comments.filter(c => c._id !== action.payload)
    },
  
  }
})


const postReducer = PostSlice.reducer;
const postActions = PostSlice.actions;

export { postReducer, postActions }
