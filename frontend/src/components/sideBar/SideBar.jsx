import { Link } from "react-router-dom";
import { useEffect } from "react";
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from "../../redux/apiCalls/CategoryApiCalls";

const SideBar = () => {

  const dispatch = useDispatch()
  const {categories} = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getAllCategories())
    // eslint-disable-next-line
  }, []);

  return (

    <div className="sidebar">

      <h1 className="sidebar-title">
        CATEGORIES
      </h1>
      <ul className="sidebar-links">
        {categories.map((item) => <Link to={`/posts/category/${item.title}`} key={item?._id} className="sidebar-link">{item.title}</Link>)}
      </ul>
    </div>
  );
}

export default SideBar;