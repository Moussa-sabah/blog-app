import './UpdatePostModel.css'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../redux/apiCalls/PostApiCalls';
import { getAllCategories } from '../../redux/apiCalls/CategoryApiCalls';
const UpdatePostModel = ({ setUpdatePostModel, post, id }) => {

  const dispatch = useDispatch()
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [description, setDescription] = useState(post.description)
  const { categories } = useSelector(state => state.category)

  const updatePostSubmitHandler = (e) => {
    e.preventDefault()
    if (title.trim() === '') { return toast.error('title is required') }
    if (category.trim() === '') { return toast.error('category is required') }
    if (description.trim() === '') { return toast.error('description is required') }
    dispatch(updatePost(id, { title, category, description }))
    setUpdatePostModel(false)
  }

  useEffect(() => {
    dispatch(getAllCategories())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="update-post-model">

      <form onSubmit={updatePostSubmitHandler} className='update-post-form'>
        <abbr title="close"><i onClick={() => { setUpdatePostModel(false) }} className="bi bi-x-lg"></i></abbr>
        <h1 className='page-title'>Update Post</h1>
        <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='form-input' type="text" />
        <select value={category} onChange={(e) => { setCategory(e.target.value) }} className='form-select'>
          <option disabled value="">Seletc Category</option>
          {categories.map((category) => {
            return (<option key={category._id} value={category.title}>{category.title}</option>)
          })}
        </select>
        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className='form-textarea' name="" id=""></textarea>
        <button className='form-update-btn'>Update</button>
      </form>
    </div>

  );
}

export default UpdatePostModel;