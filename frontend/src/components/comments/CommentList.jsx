
import './CommentList.css'
import swal from 'sweetalert';
import Moment from 'react-moment'
import UpdateCommentModal from './UpdateCommentModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/apiCalls/CommentApiCalls';

const CommentList = ({ comments, user }) => {
  const dispatch = useDispatch()
  const [updateCommentModal, setUpdateCommentModal] = useState(false);
  const [getCommentId, setGetCommentId] = useState(null)
  const [getCommentText, setGetCommentText] = useState('')

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
        dispatch(deleteComment(commentId))
        } 
        
      });
  }

  const updateCommentHandler = (commentId,commentText) => {
    setUpdateCommentModal(true)
    setGetCommentId(commentId)
    setGetCommentText(commentText)
  }




  return (

    <div className="comment-list">

      <h1 className="number-of-comments">{comments?.length} Comments</h1>
      <div className="all-comments">
        {comments?.map((comment) => {
          return (
            <div key={comment._id} className="one-comment">
              <p className="comment-userName-CreateAt">{comment.userName} <span><Moment fromNow ago>{comment.createdAt}</Moment>{' '}ago</span></p>
              <p className="comment-text">{comment.text}</p>
              {user?._id === comment.user && <div className="edit-and-delete-comment">
                <i onClick={() => { updateCommentHandler(comment._id,comment.text) }} className="bi bi-pencil-square"></i>
                <i onClick={()=>{deleteCommentHandler(comment._id)}} className="bi bi-trash-fill"></i>
              </div>}
            </div>
          )
        })}
      </div>
      {updateCommentModal ? <UpdateCommentModal setUpdateCommentModal={setUpdateCommentModal} commentId={getCommentId} commentText={getCommentText } /> : null}

    </div>
  );
}

export default CommentList;