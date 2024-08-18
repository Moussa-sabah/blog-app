
import './AdminTables.css'
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteProfile, getAllProfiles } from '../../redux/apiCalls/ProfileApiCalls'

const UsersTable = () => {
  const dispatch = useDispatch()
  const { profiles,isProfileDeleted } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getAllProfiles())
    // eslint-disable-next-line
  }, [isProfileDeleted])

  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
          dispatch(deleteProfile(userId))
        }
      });
  }


  return (
    <section className='users-table-page'>
      <AdminSidebar />


      <div className='users-table'>
        <h1 className="table-title">Users</h1>

        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td ><div className='image-and-name'><img className='user-image' src={item.profilePhoto.url} alt="" />{item.userName}</div></td>
                <td>{item.email}</td>
                <td>
                  <div className='btns'>
                    <Link to='/profile/1' className='view-btn'>View Profile</Link>
                    <button onClick={()=>{deleteUserHandler(item._id)}} className='delete-btn' >Delete Profile</button></div>
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