
import { postActions } from "../slices/PostSlice";
import request from '../../request/request'
import { toast } from 'react-toastify'
import { commentActions } from "../slices/CommentSlice";

export function addNewComment(comment) {

  return async (dispatch, getState) => {

    try {
      const { data } = await request.post('/api/comments', comment, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

      dispatch(postActions.addComment(data))
    }
    catch (error) {
      toast.error(error.response.data.message)
    }

  }
}


export function updateComment(commentId, text) {

  return async (dispatch, getState) => {

    try {
      const { data } = await request.put(`/api/comments/${commentId}`, { text }, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

      dispatch(postActions.updateComment(data))
    }
    catch (error) {
      toast.error(error.response.data.message)
    }

  }
}

export function deleteComment(commentId) {

  return async (dispatch, getState) => {

    try {
      const { data } = await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(commentActions.deleteComment(commentId))
      dispatch(postActions.deleteComment(data.id))

      toast.success(data.message)
    }
    catch (error) {
      toast.error(error.response.data.message)
    }

  }
}



export function getAllComments() {

  return async (dispatch, getState) => {

    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

      dispatch(commentActions.setComments(data))
    }
    catch (error) {
      toast.error(error.response.data.message)
    }

  }
}
