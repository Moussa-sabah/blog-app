


import './UpdateProfileModal.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/apiCalls/ProfileApiCalls';


const UpdateProfileModal = ({ setUpdateProfileModal, profile }) => {
  const dispatch = useDispatch()

  const [userName, setUserName] = useState(profile.userName);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState('');

  const updateProfileSubmit = (e) => {
    e.preventDefault()
    const updatedUser = { userName, bio }
    if (password !== '') {
      updatedUser.password = password
    }
    dispatch(updateProfile(profile?._id, updatedUser))
    setUpdateProfileModal(false)

  }


  return (
    <div className="update-profile-modal">
      <form onSubmit={updateProfileSubmit} className='update-profile-form'>
        <abbr title="close"><i onClick={() => { setUpdateProfileModal(false) }} className="bi bi-x-lg"></i></abbr>
        <h1 className='page-title'>Update Profile</h1>
        <input value={userName} onChange={(e) => { setUserName(e.target.value) }} className='form-input' type="text" placeholder='name' />
        <input value={bio} onChange={(e) => { setBio(e.target.value) }} className='form-input' type="text" placeholder='bio' />
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-input' type="password" placeholder='password' />
        <button className='form-update-btn'>Update</button>
      </form>
    </div>

  );
}

export default UpdateProfileModal;