
import './AdminTables.css'
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteComment, getAllComments } from '../../redux/apiCalls/CommentApiCalls'

const UsersTable = () => {
  const dispatch = useDispatch()
  const { comments } = useSelector(state => state.comment)

  useEffect(() => {
    dispatch(getAllComments())
    // eslint-disable-next-line
  }, [])

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteComment(commentId))
        }
      });
  }


  return (
    <section className='comments-table-page'>
      <AdminSidebar />


      <div className='comments-table'>
        <h1 className="table-title">Comments</h1>

        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td >
                  <div className='image-and-name'>
                    <img className='user-image' src={item.user.profilePhoto?.url} alt="" />
                    {item.userName}
                  </div>
                </td>
                <td>{item.text}</td>
                <td>
                  <div className='btns'>
                    <button onClick={() => {
                      deleteCommentHandler(item._id)
                    }} className='delete-btn' >Delete Comment</button></div>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>

    </section >

  );
}

export default UsersTable;