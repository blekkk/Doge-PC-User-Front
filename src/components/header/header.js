import './header.css';
import { Formik, Form, Field } from 'formik';
import { NavLink, Link } from 'react-router-dom';
import { IoPersonCircle, IoCart } from 'react-icons/io5';
import { useState } from 'react';

const Header = (props) => {
  const { token, deleteToken } = props;
  const [profileDropdownFlag, setProfileDropdownFlag] = useState(false);

  const profileDropdown = () => {
    if (profileDropdownFlag)
      return (
        <div className="profile-dropdown">
          <Link to="/account">
            <p>My Account</p>
          </Link>
          <p onClick={() => {
            deleteToken();
          }}>Log Out</p>
        </div>
      )
  }

  const profile = () => {
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
            <span className="header-logged profile" onClick={() => setProfileDropdownFlag(!profileDropdownFlag)}><IoPersonCircle /></span>
            {profileDropdown()}
          </div>
          <div>
            <NavLink to='/cart'>
              <span className="header-logged cart"><IoCart /></span>
            </NavLink>
          </div>
        </nav>
      )
    }
  }

  return (
    <header>
      <div className="header-wrapper">
        <nav>
          <img src={process.env.PUBLIC_URL + '/dogePC.png'} alt="logo" className="logo-header" />
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
        {profile()}
      </div>
      <div className="category-wrapper">
        <ul>
          <li>
            <NavLink to='/Processor'>
              Processor
            </NavLink>
          </li>
          <li>
            <NavLink to='/GPU'>
              GPU
            </NavLink>
          </li>
          <li>
            <NavLink to='/RAM'>
              RAM
            </NavLink>
          </li>
          <li>
            <NavLink to='/Motherboard'>
              Motherboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/Storage'>
              Storage
            </NavLink>
          </li>
          <li>
            <NavLink to='/PSU'>
              PSU
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;