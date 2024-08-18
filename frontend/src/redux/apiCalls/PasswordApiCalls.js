

import { passwordActions } from "../slices/PasswordSlice";
import request from '../../request/request'
import { toast } from 'react-toastify'

export function sendResetPasswordLink(email) {
  return async () => {

    try {
      const { data } = await request.post('/api/password/forgot-password', { email })
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      
    }

  }
}


export function getResetPasswordLink(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`)
    } catch (error) {
      dispatch(passwordActions.setIsError())
    }

  }
}


export function resetPassword(user, newPassword) {
  return async () => {
    try {
      const { data } = await request.post(`/api/password/reset-password/${user.userId}/${user.token}`, { password: newPassword })
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
}

