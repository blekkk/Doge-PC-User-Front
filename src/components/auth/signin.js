import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import './auth.css';
import axios from 'axios';

const submitSignIn = async (data) => {
  return axios.post('http://localhost:8080/user/signin', data);
}

const SignIn = (props) => {
  const { token, setToken, history } = props;
  const [accountNotExist, setAccountNotExist] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState(false);

  const displayAccountNotExist = () => {
    if (!accountNotExist) {
      return '';
    } else {
      return (
        <span className="form-error">Email or password is wrong!</span>
      )
    }
  };

  if (!token)
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div>
            <h2>Sign In</h2>
          </div>
          <div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validate={(values) => {
                const error = {};
                return error;
              }}
              onSubmit={ async (values, { setSubmitting }) => {
                try {
                  const data = { ...values };
                  const result = await submitSignIn(data);
                  setAccountNotExist(false);
                  setSigninSuccess(true);
                  setTimeout(() => {
                    setToken(result.headers['auth-token']);
                    setSubmitting(false);
                  }, 3000)
                } catch (error) {
                  console.log(error);
                  setAccountNotExist(true);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className='auth-form'>
                  <div className="form-item">
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" required />
                  </div>
                  <div className="form-item">
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" required />
                    <ErrorMessage name="password" component="div" className="form-error" />
                  </div>
                  <div className="form-item">
                    <button type="submit" disabled={isSubmitting} className="main-button">
                      {signinSuccess ? 'Success, please wait...' : 'Sign In'}
                    </button>
                  </div>
                  { displayAccountNotExist() }
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <span>Don’t have an account?&nbsp;
              <Link to='/signup'>
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    )
  return (
    <>
      { history.push('/') }
    </>
  )
}

export default withRouter(SignIn);