import './header.css';
import { Formik, Form, Field } from 'formik';
import { NavLink, Link } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { IoPersonCircle, IoCart } from 'react-icons/io5'
import { useState } from 'react';

const profileDropdown = (flag) => {
  if (flag)
    return (
      <div className="profile-dropdown">
        <p>My Account</p>
        <p onClick={() => {
          localStorage.removeItem('auth-token-user');
        }}>Log Out</p>
      </div>
    )
}

const profile = (token, flag, setFlag) => {
  if (!token) {
    return (
      <nav>
        <Link to='/signin'>
          Sign In
        </Link>
        <Link to='/signup'>
          Sign Up
        </Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <div>
          <span className="header-logged profile" onClick={() => setFlag(!flag)}><IoPersonCircle /></span>
          {profileDropdown(flag, setFlag)}
        </div>
        <div>
          <span className="header-logged cart"><IoCart /></span>
        </div>
      </nav>
    )
  }
}

const Header = (props) => {
  const { token } = useToken();
  const [profileDropdownFlag, setProfileDropdownFlag] = useState(false);

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
        {profile(token, profileDropdownFlag, setProfileDropdownFlag)}
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