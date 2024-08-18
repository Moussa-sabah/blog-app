import './Form.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/apiCalls/AuthApiCalls';
import swal from 'sweetalert'

const Register = () => {

  const { registerMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSumbitHandler = (e) => {
    e.preventDefault()
    dispatch(registerUser({ userName, email, password }))
  }

  const navigate = useNavigate()

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: 'success'
    }).then(isOk => {
      if (isOk) {
        navigate('/login')
      }
    })
  }

  return (
    <section className="form-container">

      <h1 className="form-title">Create new account </h1>
      <form onSubmit={formSumbitHandler} className="form">
        <label htmlFor="">Username</label>
        <input value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" placeholder="Enter your name" />
        <label htmlFor="">Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter your email" />
        <label htmlFor="">Password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Enter your password" />
        <button>Register</button>
        <div className='second-option'>Already have an account? <Link className='second-option-link' to='/login'>Login</Link></div>
      </form>

    </section>
  );
}

export default Register;