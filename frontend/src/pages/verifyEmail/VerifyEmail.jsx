
import { Link, useParams } from 'react-router-dom'
import './VerifyEmail.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { verificationEmail } from '../../redux/apiCalls/AuthApiCalls'
const VerifyEmail = () => {

  const dispatch = useDispatch()
  const { isAccountVerified } = useSelector(state => state.auth)
  const { userId, token } = useParams()
  
  useEffect(() => {
    dispatch(verificationEmail(userId, token))
    // eslint-disable-next-line
  }, [userId, token])
  return (
    <section className="email-verify">
      {isAccountVerified ? <>
        <i className="bi bi-patch-check verified-icon"></i>
        <p className='email-verify-text'>Your email address has been successfully verified</p>
        <Link to='/login' className='verified-link'>Go To Login Page</Link>
      </> :
        <h1>
          Not Found
        </h1>}

    </section>
  );
}

export default VerifyEmail;