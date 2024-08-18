import './AdminTables.css'
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deletePost, getAllPosts } from '../../redux/apiCalls/PostApiCalls'


const PostsTable = () => {

  const dispatch = useDispatch()
  const { posts,isPostDeleted } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
    // eslint-disable-next-line
  }, [isPostDeleted])

  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
        dispatch(deletePost(postId))
        }
      });
  }


  return (
    <section className='posts-table-page'>
      <AdminSidebar />


      <div className='posts-table'>
        <h1 className="table-title">Posts</h1>

        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td ><div className='image-and-name'><img className='user-image' src={item.user.profilePhoto.url} alt="" />{item.user.userName}</div></td>
                <td>{item.title}</td>
                <td>
                  <div className='btns'>
                    <Link to={`/post/details/${item._id}`} className='view-btn'>View Post</Link>
                    <button onClick={()=>{deletePostHandler(item._id)}} className='delete-btn' >Delete Post</button></div>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>

    </section >

  );
}

export default PostsTable;