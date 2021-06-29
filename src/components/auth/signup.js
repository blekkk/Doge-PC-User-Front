import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import './auth.css'
import axios from 'axios';
import useToken from '../../hooks/useToken';

const submitSignUp = async (data) => {
  return axios.post('http://localhost:8080/user/signup', data);
}

const displayEmailNotExisting = (emailNotExisting) => {
  if (emailNotExisting) {
    return '';
  } else {
    return (
      <span className="form-error">Email already exist!</span>
    )
  }
};

const SignUp = (props) => {
  const [emailNotExisting, setEmailNotExisting] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { token, setToken } = useToken();
  const { history } = props;

  if (!token)
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div>
            <h2>Sign Up</h2>
          </div>
          <div>
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
                province: '',
                city: '',
              }}
              validate={(values) => {
                const error = {};
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(values.password)) {
                  error.password = 'Password must be at least 8 characters, contains at least 1 UPPERCASE, 1 LOWERCASE, 1 NUMBER, and 1 SYMBOL!'
                } else if (values.password !== values.confirm_password) {
                  error.confirm_password = 'Password does not match!';
                }
                return error;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const newUser = { ...values };
                  await submitSignUp(newUser);
                  setSignupSuccess(true);
                  setEmailNotExisting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    history.push('/signin')
                  }, 3000);
                } catch (error) {
                  console.log(error);
                  setEmailNotExisting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className='auth-form'>
                  <div className="form-item-name">
                    <div className="form-item">
                      <label htmlFor="first_name">First Name</label>
                      <Field type="text" name="first_name" required />
                    </div>
                    <div className="form-item">
                      <label htmlFor="last_name">Last Name</label>
                      <Field type="text" name="last_name" />
                    </div>
                  </div>
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
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <Field type="password" name="confirm_password" required />
                    <ErrorMessage name="confirm_password" component="div" className="form-error" />
                  </div>
                  <div className="form-item-address">
                    <div className="form-item">
                      <label htmlFor="province">Province</label>
                      <Field type="text" name="province" />
                    </div>
                    <div className="form-item">
                      <label htmlFor="city">City</label>
                      <Field type="text" name="city" />
                    </div>
                  </div>
                  <div className="form-item">
                    <button type="submit" disabled={isSubmitting} className="main-button">
                      {signupSuccess ? 'Success, please wait...' : 'Sign Up'}
                    </button>
                  </div>
                  {displayEmailNotExisting(emailNotExisting)}
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <span>Have an account?&nbsp;
              <Link to='/signin'>
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    )
  return (
    <>
      {history.push('/')}
    </>
  )
}

export default withRouter(SignUp);