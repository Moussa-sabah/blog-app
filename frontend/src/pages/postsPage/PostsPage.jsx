
import Pagenation from '../../components/pagenation/Pagenation'
import PostList from '../../components/post/PostList'
import SideBar from '../../components/sideBar/SideBar'
import { useEffect, useState } from 'react'
import './PostsPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsCount, PostsbyPageNumber } from '../../redux/apiCalls/PostApiCalls'

const Posts = () => {

  const dispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)

  const { posts, postsCount } = useSelector(state => state.post)
  const post_per_page = 3;

  const NumberOfPages = Math.ceil(postsCount / post_per_page)
  useEffect(() => {
    window.scroll(0, 0)
    dispatch(PostsbyPageNumber(pageNumber))
    // eslint-disable-next-line
  }, [pageNumber]);

  useEffect(() => {
    dispatch(getPostsCount())
    // eslint-disable-next-line
  }, []);



  return (
    <>
      <section className="posts-page">

        <PostList posts={posts} />
        <SideBar  />

      </section>
      <Pagenation NumberOfPages={NumberOfPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </>


  );
}

export default Posts;