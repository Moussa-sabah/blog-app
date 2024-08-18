import './AdminTables.css'
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { deleteCategory, getAllCategories } from '../../redux/apiCalls/CategoryApiCalls';
const PostsTable = () => {

  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)


  useEffect(() => {
    dispatch(getAllCategories())
    // eslint-disable-next-line
  }, [])

  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
          dispatch(deleteCategory(categoryId))
        }
      });
  }


  return (
    <section className='categories-table-page'>
      <AdminSidebar />


      <div className='categories-table'>
        <h1 className="table-title">Categories</h1>

        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Categories</th>
              <th className='td-category'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td >{item.title}</td>
                <td>
                  <div className='btns'>
                    <button onClick={()=>{deleteCategoryHandler(item._id)}} className='delete-btn' >Delete Category</button></div>
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