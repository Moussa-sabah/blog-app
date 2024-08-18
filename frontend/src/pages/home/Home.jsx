


import PostList from '../../components/post/PostList';
import SideBar from '../../components/sideBar/SideBar'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import './Home.css'
import { PostsbyPageNumber } from '../../redux/apiCalls/PostApiCalls';

const Home = () => {

  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  useEffect(() => {

    dispatch(PostsbyPageNumber(1))
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home">

      <div className="home-welcome">
        <div className="home-welcome-layout">
          <h1 className='welcome-text'>Welcome to Blog</h1>
        </div>
      </div>
      <div className='home-latest-post'>Latest Posts</div>
      <div className='home-container'>
        <PostList posts={posts}/>
        <SideBar  />
      </div>

      <div className='home-see-all-posts'>
        <Link className='see-all-posts-link' to='posts'>See All Posts</Link>
      </div>

    </div>

  );
}

export default Home;