import './Form.css'
import { useEffect, useId, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { getResetPasswordLink, resetPassword } from '../../redux/apiCalls/PasswordApiCalls';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {

  const dispatch = useDispatch()
  const { isError } = useSelector(state => state.password)
  const { userId, token } = useParams()
  const [password, setPassword] = useState('');


  useEffect(() => {
    dispatch(getResetPasswordLink(userId, token))
    // eslint-disable-next-line
  }, [])

  const formSumbitHandler = (e) => {
    e.preventDefault()


    if (password.trim() === '') { return toast.error('Password is requierd') }

    dispatch(resetPassword({ userId, token }, password))
  }

  return (
    <section className="form-container">
      {isError ? <><h1>Not found</h1></>
        : <>  <h1 className="form-title">Reset password </h1>
          <form onSubmit={formSumbitHandler} className="form">
            <label htmlFor="">Password</label>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Enter your password" />
            <button>Reset</button>
          </form></>}
    </section>
  );
}

export default ResetPassword;