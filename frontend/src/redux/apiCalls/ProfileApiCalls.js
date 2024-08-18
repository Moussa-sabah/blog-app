

import { profileActions } from "../slices/ProfileSlice";
import { authActions } from "../slices/AuthSlice";
import request from '../../request/request'
import { toast } from 'react-toastify'


export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`)
      dispatch(profileActions.setProfile(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

}


export function uploadProfilePhoto(file) {
  return async (dispatch, getState) => {

    try {
      const { data } = await request.post('/api/users/profile/upload-profile-photo', file, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
          "Content-Type": "multipart/form-data"
        }
      })
      dispatch(profileActions.setProfilePhoto(data.profilePhoto))
      toast.success(data.message)
      dispatch(authActions.setUserPhoto(data.profilePhoto))
      let user = JSON.parse(localStorage.getItem('userInfo'))
      user.profilePhoto = data.profilePhoto;
      localStorage.setItem('userInfo', JSON.stringify(user))
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
}


export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {

    try {
      const { data } = await request.put(`/api/users/profile/${userId}`, profile, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token
        }
      })
      dispatch(profileActions.updateProfile(data))
      dispatch(authActions.setUserName(data.userName))
      let user = JSON.parse(localStorage.getItem('userInfo'))
      user.userName = data.userName
      localStorage.setItem('userInfo', JSON.stringify(user))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function deleteProfile(userId) {
  return async (dispatch, getState) => {

    try {
      dispatch(profileActions.setLoading())
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token
        }
      })
      dispatch(profileActions.setIsProfileDeleted())
      toast.success(data.message)
      setTimeout(() => { dispatch(profileActions.clearIsProfileDeleted()) }, 2000);
    } catch (error) {
      toast.error(error.response.data.message)
      dispatch(profileActions.clearLoading())
    }
  }
}




export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token
        }
      })

      dispatch(profileActions.setUsersCount(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function getAllProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token
        }
      })

      dispatch(profileActions.setProfiles(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}



