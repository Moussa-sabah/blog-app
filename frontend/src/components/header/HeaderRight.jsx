
import { Link,useNavigate } from "react-router-dom";

import { useSelector ,useDispatch} from 'react-redux'
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/AuthApiCalls";


const HeaderRight = () => {

  const { user } = useSelector(state => state.auth)
  const [dropDown, setDropDown] = useState(false)

  const disPatch = useDispatch()

  const logoutHandler =()=>{
    disPatch(logoutUser())
    setDropDown(false)

  }

  return (
    <div className="header-right">
      {user ?
        (
          <>
            <div className='header-right-user-info'>
              <p className='header-right-userName'>{user?.userName}</p>
              <img onClick={() => { setDropDown(prev => !prev) }} className="header-right-userImage" src={user?.profilePhoto?.url} alt="" />

              {dropDown ? (
                <div className="header-right-dropDown">
                  <Link onClick={()=>{setDropDown(false)}} className='header-dropDown-item' to={`/profile/${user?._id}`}>
                    <i class="bi bi-person-square"></i>
                    <span>Profile</span>
                  </Link>
                  <div onClick={()=>{logoutHandler()}}  className='header-dropDown-item'>
                    <i class="bi bi-box-arrow-in-left"></i>
                    <span>Logout</span>
                  </div>
                </div>
              ) : null}
            </div>

          </>
        )
        : (
          <>
            <Link to='/login' className='header-right-link'>
              <i className="bi bi-box-arrow-in-right"></i>
              Login
            </Link>
            <Link to='/register' className='header-right-link'>
              <i className="bi bi-person-plus"></i>
              Register
            </Link>
          </>
        )}
    </div>
  );
}

export default HeaderRight;