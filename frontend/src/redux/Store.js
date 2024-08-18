
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/AuthSlice'
import { profileReducer } from './slices/ProfileSlice'
import { postReducer } from './slices/PostSlice'
import { categoryReducer } from './slices/CategorySlice'
import { commentReducer } from './slices/CommentSlice'
import { passwordReducer } from './slices/PasswordSlice'


const Store = configureStore({

  reducer: {
    auth: authReducer,
    profile : profileReducer,
    post:postReducer,
    category:categoryReducer,
    comment:commentReducer,
    password:passwordReducer
  }

})


export default Store