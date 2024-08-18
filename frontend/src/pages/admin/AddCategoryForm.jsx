
import { useState } from 'react';
import './Admin.css'
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import {  createCategory } from '../../redux/apiCalls/CategoryApiCalls';

const AddCategoryForm = () => {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('');

  const AddCategorySubmitHandler = (e) => {
    e.preventDefault()
    if (title.trim() === '') { return toast.error('Title is requierd') }
    dispatch(createCategory(title))
  }

  return (
    <div className="add-category">
      <form onSubmit={AddCategorySubmitHandler} className="add-category-form">
        <h1 className="add-category-from-title">Add New Category</h1>
        <label className="add-category-form-label">Category Title</label>
        <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className="add-category-form-input" type="text" placeholder="Enter Category Title" />
        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default AddCategoryForm;