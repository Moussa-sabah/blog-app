
import { useState } from 'react';
import './AddComment.css'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { addNewComment } from '../../redux/apiCalls/CommentApiCalls';

const AddComment = ({ postId }) => {
  const dispatch = useDispatch()

  const [text, setText] = useState('');

  const addCommentHandler = (e) => {
    e.preventDefault()
    if (text.trim() === '') { return toast.error('Please write something') }
    dispatch(addNewComment({text,postId}))
    setText('')
  }

  return (
    <div className="add-comment">
      <form onSubmit={addCommentHandler} className='add-comment-form' action="">
        <input className='add-comment-input'
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => { setText(e.target.value) }} />
        <button className='add-comment-btn'>Comment</button>
      </form>
    </div>
  );
}

export default AddComment;