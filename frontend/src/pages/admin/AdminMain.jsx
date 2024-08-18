
import { Link } from "react-router-dom";
import './Admin.css'
import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getAllCategories } from "../../redux/apiCalls/CategoryApiCalls";
import { getUsersCount } from "../../redux/apiCalls/ProfileApiCalls";
import { getPostsCount } from "../../redux/apiCalls/PostApiCalls";
import { getAllComments } from "../../redux/apiCalls/CommentApiCalls";


const AdminMain = () => {



  const dispatch = useDispatch()

  const { categories } = useSelector(state => state.category)
  const { usersCount } = useSelector(state => state.profile)
  const { postsCount } = useSelector(state => state.post)
  const { comments } = useSelector(state => state.comment)

  useEffect(() => {

    dispatch(getAllCategories())
    dispatch(getUsersCount())
    dispatch(getPostsCount())
    dispatch(getAllComments())
    // eslint-disable-next-line
  }, [])
  return (
    <div className="admin-main">
      <div className="all-components">
        <div className='admin-main-one-component'>
          <p className="component-name">User</p>
          <p className="component-number">{usersCount}</p>
          <div className="link-and-icon">
            <Link to='/admin-dashboard/users-table' className="see-link">See all users</Link>
            <i class="bi bi-person-fill"></i>
          </div>
        </div>
        <div className='admin-main-one-component'>
          <p className="component-name">Posts</p>
          <p className="component-number">{postsCount}</p>
          <div className="link-and-icon">
            <Link to='/admin-dashboard/posts-table' className="see-link">See all posts</Link>
            <i class="bi bi-file-post"></i>
          </div>
        </div>
        <div className='admin-main-one-component'>
          <p className="component-name">Categories</p>
          <p className="component-number">{categories.length}</p>
          <div className="link-and-icon">
            <Link to='/admin-dashboard/categories-table' className="see-link">See all categories</Link>
            <i class="bi bi-tag-fill"></i>
          </div>
        </div>

        <div className='admin-main-one-component'>
          <p className="component-name">Commenets</p>
          <p className="component-number">{comments.length}</p>
          <div className="link-and-icon">
            <Link to='/admin-dashboard/comments-table' className="see-link">See all comments</Link>
            <i class="bi bi-chat-left-text-fill"></i>
          </div>
        </div>
      </div>

      <AddCategoryForm />
    </div>
  );
}

export default AdminMain;