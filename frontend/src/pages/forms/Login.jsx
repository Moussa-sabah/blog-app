import './Form.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/apiCalls/AuthApiCalls';
const Login = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSumbitHandler = (e) => {
    e.preventDefault()

    if (email.trim() === '') { return toast.error('Email is requierd') }
    if (password.trim() === '') { return toast.error('Password is requierd') }

    dispatch(loginUser({email,password}))
  }

  return (
    <section className="form-container">

      <h1 className="form-title">Create new account </h1>
      <form onSubmit={formSumbitHandler} className="form">
        <label htmlFor="">Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter your email" />
        <label htmlFor="">Password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Enter your password" />
        <button>Login</button>
        <div className='second-option'>Did you forgot password? <Link className='second-option-link' to='/forgot-password'>Forgot Password</Link></div>
      </form>

    </section>
  );
}

export default Login;