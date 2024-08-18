

import { postActions } from '../slices/PostSlice'
import request from '../../request/request'
import { toast } from 'react-toastify'

export function PostsbyPageNumber(pageNumber) {

  return async (dispatch) => {
    try {

      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`)
      dispatch(postActions.setPosts(data))
  
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
}



export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get('/api/posts/count')
      dispatch(postActions.setPostsCount(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function getPostsByCategory(category) {

  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`)
      dispatch(postActions.setPosts(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function createNewPost(formData) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setCreateLoading())
      await request.post('/api/posts', formData, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(postActions.setIsPostCreated())
      setTimeout(() => { dispatch(postActions.clearIsPostCreated()) }, 2000)
    } catch (error) {
      toast.error(error.response.data.message)
      dispatch(postActions.clearCreateLoding())
    }
  }
}


export function getOnePost(postId) {

  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`)
      dispatch(postActions.setPost(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function toggleLike(postId) {

  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/likes/${postId}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(postActions.setLike(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function updatePostImage(formData, postId) {

  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, formData, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
          'Content-Type': 'multipart/form-data',
        }
      })
      toast.success('Image is updated')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function updatePost(postId, post) {

  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, post, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(postActions.setPost(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function deletePost(postId) {

  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(postActions.deletePost(data.postId))
      dispatch(postActions.setIsPostDeleted())
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function getAllPosts() {

  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`)
      dispatch(postActions.setPosts(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}