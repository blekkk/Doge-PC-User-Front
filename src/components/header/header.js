import './header.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <div className="header-wrapper">
        <nav>
          <img src={process.env.PUBLIC_URL + 'dogePC.png'} alt="logo" className="logo-header" />
          <NavLink to='/'>
            <h2>
              Doge-PC
            </h2>
          </NavLink>
        </nav>
        <nav>
          <Formik
            initialValues={{ search: '' }}
            onSubmit={(values, { setSubmitting }) => {
              alert(values.search);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='search-field'>
                  <Field type="text" name="search" placeholder="Search here..." />
                  <button type="submit" disabled={isSubmitting} className="main-button">
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </nav>
        <nav>
          <NavLink to='/signin'>
            Sign In
          </NavLink>
          <NavLink to='/signup'>
            Sign Up
          </NavLink>
        </nav>
      </div>
      <div className="category-wrapper">
        <ul>
          <li>
            <NavLink to='/processor'>
              Processor
            </NavLink>
          </li>
          <li>
            <NavLink to='/gpu'>
              GPU
            </NavLink>
          </li>
          <li>
            <NavLink to='/ram'>
              RAM
            </NavLink>
          </li>
          <li>
            <NavLink to='/motherboard'>
              Motherboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/storage'>
              Storage
            </NavLink>
          </li>
          <li>
            <NavLink to='/psu'>
              PSU
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;