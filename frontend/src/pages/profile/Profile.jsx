
import { useEffect, useState } from 'react'
import swal from 'sweetalert';
import './Profile.css'
import { toast } from 'react-toastify'
import UpdateProfileModal from '../../modals/updateProfile/UpdateProfileModal';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getUserProfile, uploadProfilePhoto } from '../../redux/apiCalls/ProfileApiCalls';
import { useParams, useNavigate } from 'react-router-dom';
import PostItem from '../../components/post/PostItem';
import { logoutUser } from '../../redux/apiCalls/AuthApiCalls'
import { RotatingLines } from 'react-loader-spinner'

const Profile = () => {

  const dispatch = useDispatch()
  const { profile, isProfileDeleted, loading } = useSelector(state => state.profile)
  const { user } = useSelector(state => state.auth)
  const [file, setFile] = useState(null);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);


  const { id } = useParams()

  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [id]);

  const navigate = useNavigate()
  useEffect(() => {
    if (isProfileDeleted) {
      navigate('/')
    }

  }, [navigate, isProfileDeleted])

  const uploadImageProfileHandler = (e) => {
    e.preventDefault()

    if (!file) { return toast.warning('Please select an image') }


    let formData = new FormData()
    formData.append('image', file)
    dispatch(uploadProfilePhoto(formData))
  }


  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
          dispatch(deleteProfile(profile?._id))
          dispatch(logoutUser())
        }
      });

  }


  return (



    <section className="profile-page">

      {loading ? <div className='profile-page-loading'>
        <RotatingLines
          visible={true}
          height="100"
          width="100"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div> : <>  <div className="profile-header">
        <div className='profile-header-left'>
          <div className='profile-image-wrapper'>
            <img className='profile-image' src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt="" />
            {user?._id === profile?._id && <form onSubmit={uploadImageProfileHandler} className='profile-form'>
              <label className='profile-form-label bi bi-camera-fill' htmlFor="file">
              </label>
              <input onChange={(e) => { setFile(e.target.files[0]) }} style={{ display: 'none' }} type="file" name='file' id='file' />
              <button className='profile-form-btn'>upload</button>
            </form>}
          </div>
          <h1 className='profile-userName'>{profile?.userName}</h1>
          <p className='profile-introduction'>{profile?.bio}</p>
          <p className='date-joined'>Date Joined: <span className='date'>{new Date(profile?.createdAt).toDateString()}</span></p>
        </div>
        {user?._id === profile?._id && <div className='profile-header-right'>
          <button onClick={() => { setUpdateProfileModal(true) }} className='update-profile-btn'> <i className="bi bi-person-square"></i>Update Profile</button>
          <button onClick={deleteAccountHandler} className='delete-account-btn'><i className="bi bi-trash-fill"></i>Delete Account</button>
        </div>}

      </div>

        <div className='profile-posts'>

          <h1 className='profile-posts-title'>{profile?.userName} Posts</h1>
          {profile?.posts?.map((post) => {
            return (
              <PostItem
                post={post}
                key={post._id}
                userName={profile?.userName}
                userId={profile?._id} />
            )
          })}
        </div>


        {updateProfileModal ? <UpdateProfileModal setUpdateProfileModal={setUpdateProfileModal} profile={profile} /> : null}</>}
    </section>

  );
}

export default Profile;