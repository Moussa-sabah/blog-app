import './Form.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { sendResetPasswordLink } from '../../redux/apiCalls/PasswordApiCalls';


const ForgotPassword = () => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('');

  const formSumbitHandler = (e) => {
    e.preventDefault()
    if (email.trim() === '') { return toast.error('Email is requierd') }
    dispatch(sendResetPasswordLink(email))
  
  }

  return (
    <section className="form-container">

      <h1 className="form-title">Forgot password </h1>
      <form onSubmit={formSumbitHandler} className="form">
        <label htmlFor="">Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter your email" />
        <button>Submit</button>
      </form>
    </section>
  );
}

export default ForgotPassword;