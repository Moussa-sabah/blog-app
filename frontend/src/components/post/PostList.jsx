import PostItem from "./PostItem";
import './Post.css'
const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.length > 0 ? posts?.map((item) => {
        return <PostItem post={item} key={item?._id} />

      }) : <h1>Not Found Posts</h1>}
    </div>
  );
}

export default PostList;