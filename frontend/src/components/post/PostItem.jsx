import { Link } from 'react-router-dom'

const PostItem = ({ post, userName, userId }) => {

  const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`
  const name = userName?userName:post?.user?.userName;
  return (
    <div className="post-item">
      <img className="post-image" src={post?.image.url} alt="" />
      <div className="author-and-date">
        <p className="post-author">Author : <Link to={profileLink} className='author-name'>{name}</Link></p>
        <p className="post-date">{new Date(post?.createdAt).toDateString()}</p>
      </div>
      <div className="title-and-category">
        <p className="post-title">{post?.title}</p>
        <Link to={`/posts/category/${post?.category}`} className="post-category">{post?.category}</Link>
      </div>
      <p className="post-description">{post?.description}</p>
      <Link to={`/post/details/${post?._id}`} className="read-more-btn">Read More...</Link>
    </div>
  );
}

export default PostItem;