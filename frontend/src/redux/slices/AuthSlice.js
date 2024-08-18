
import { createSlice } from '@reduxjs/toolkit'



const AuthSlice = createSlice({

  name: 'auth',
  initialState: {
    user: localStorage.getItem('userInfo') ?
      JSON.parse(localStorage.getItem('userInfo')) :
      null,
    registerMessage: null,
    isAccountVerified: false,
  },

  reducers: {
    login(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    register(state, action) {
      state.registerMessage = action.payload
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload
    },
    setUserName(state, action) {
      state.user.userName = action.payload
    },
    setIsAccountVerified(state) {
      state.isAccountVerified = true
      state.registerMessage = null
    }
  }

})


const authReducer = AuthSlice.reducer
const authActions = AuthSlice.actions


export { authReducer, authActions }