import './CreatePost.css'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost } from '../../redux/apiCalls/PostApiCalls';
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { getAllCategories } from '../../redux/apiCalls/CategoryApiCalls';


const CreatePost = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isPostCreated, createLoading } = useSelector(state => state.post)
  const { categories } = useSelector(state => state.category)
  const [title, setTilte] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {

    e.preventDefault()

    if (title.trim() === '') { return toast.error('title is required') }
    if (category.trim() === '') { return toast.error('category is required') }
    if (description.trim() === '') { return toast.error('description is required') }
    if (!file) { return toast.error('file is required') }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('image', file)

    dispatch(createNewPost(formData))
  }

  useEffect(() => {

    if (isPostCreated) {
      navigate('/')
    }
  }, [isPostCreated, navigate]);


  useEffect(() => {
    dispatch(getAllCategories())
    // eslint-disable-next-line
  }, [])

  return (

    <section className="create-post">

      <h1 className="create-post-page-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="creat-post-form">
        <input onChange={(e) => setTilte(e.target.value)} className="create-post-title-input" type="text" placeholder="Post Title" value={title} />
        <select onChange={(e) => setCategory(e.target.value)} className="create-post-select" name="" id="" value={category}>
          <option value='' disabled>Selecet A Category</option>
          {categories.map((category) => {
            return (<option key={category._id} value={category.title}>{category.title}</option>)
          })}
        </select>
        <textarea onChange={(e) => setDescription(e.target.value)} className="create-post-textarea" placeholder="Post Description" name="" id="" value={description}></textarea>
        <input onChange={(e) => setFile(e.target.files[0])} className="create-post-file-input" type="file" />
        <button className="create-post-create-btn">{createLoading ?
          <RotatingLines
            visible={true}
            height="40"
            width="40"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> : 'Create'} </button>
      </form>
    </section>);
}

export default CreatePost;