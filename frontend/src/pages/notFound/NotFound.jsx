import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
  return (

    <section className="not-found">
      <div className='N404'>404</div>
      <h1 className='not-found-title'>Page Not Found</h1>
      <Link className='not-found-link' to='/'>Go to home page</Link>
    </section>

  );
}

export default NotFound;