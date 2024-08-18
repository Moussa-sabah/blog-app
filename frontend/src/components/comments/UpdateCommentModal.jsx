
import './UpdateCommentModal.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { updateComment } from '../../redux/apiCalls/CommentApiCalls';

const UpdateCommentModal = ({ setUpdateCommentModal,commentId,commentText }) => {

  const dispatch = useDispatch()
  const [text, setText] = useState(commentText);

  const updateCommentSubmitHandler = (e) => {
    e.preventDefault()
    if (text.trim() === '') { return toast.error('Please write something') }
    dispatch(updateComment(commentId,text))
    setUpdateCommentModal(false)
  }

  return (
    <div className="update-comment-model">
      <form onSubmit={updateCommentSubmitHandler} className='update-comment-form'>
        <abbr title="close"><i onClick={() => { setUpdateCommentModal(false) }} className="bi bi-x-lg"></i></abbr>
        <h1 className='page-title'>Update Comment</h1>
        <input className='form-input' type="text" value={text} onChange={(e) => { setText(e.target.value) }} />
        <button className='form-update-btn'>Update</button>
      </form>
    </div>

  );
}

export default UpdateCommentModal;