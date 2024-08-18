import { Link, useParams } from "react-router-dom";
import './Category.css'

import PostList from '../../components/post/PostList'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByCategory } from "../../redux/apiCalls/PostApiCalls";

const Category = () => {

  const { category } = useParams()

  const dispatch = useDispatch()

  const { posts } = useSelector(state => state.post)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPostsByCategory(category))
    // eslint-disable-next-line
  }, [category]);

  return (

    <section className="category-page">

      {posts?.length > 0 ? <>
        <h1 className="category-page-title">{category} Category</h1>
        
          <PostList className='haha' posts={posts} />
      
      </> :
        <>
          <h1 className="posts-not-found">Not found posts with {category} category</h1>
          <Link className="go-link" to='/posts'>go to posts page</Link>
        </>
      }

    </section>

  );
}

export default Category;