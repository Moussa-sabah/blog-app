
import { authActions } from '../slices/AuthSlice'
import request from '../../request/request'
import { toast } from 'react-toastify'

export function loginUser(user) {

  return async (dispatch) => {

    try {

      const { data } = await request.post('/api/auth/login', user)

      dispatch(authActions.login(data))

      localStorage.setItem('userInfo', JSON.stringify(data))

      toast.success(data.message)

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}



export function logoutUser() {
  return async (dispatch) => {
    try {
      dispatch(authActions.logout())
      localStorage.removeItem('userInfo')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function registerUser(user) {
  return async (dispatch) => {

    try {
      const { data } = await request.post('/api/auth/register', user)
      dispatch(authActions.register(data.message))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function verificationEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`)
      dispatch(authActions.setIsAccountVerified())
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


// Fetch method

// const response = await fetch('http://localhost:8000/api/auth/login', {
//   method: 'POST',
//   body: JSON.stringify(user),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// const data = await response.json()