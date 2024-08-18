

import { categoryActions } from "../slices/CategorySlice";
import request from '../../request/request'
import { toast } from 'react-toastify'

export function getAllCategories() {
  return async (dispatch) => {

    try {
      const { data } = await request.get('/api/categories')
      dispatch(categoryActions.setCategories(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
}


export function createCategory(title) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post('api/categories', { title }, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(categoryActions.addCategory(data))
      toast.success('Category has been added successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
}


export function deleteCategory(categortId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`api/categories/${categortId}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(categoryActions.deleteCategory(data.id))
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
}
