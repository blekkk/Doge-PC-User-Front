import './myAccount.css';
import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const MyAccount = (props) => {
  const { token, history } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/user', {
      headers: {
        'auth-token': token
      }
    }).then((res) =>
      setUser(res.data)
    ).catch(e => console.log(e.message));
  }, []);

  const handleUpdateUserProfile = async (data) => {
    return await axios.put('http://localhost:8080/user', data, {
      headers: {
        'auth-token': token
      }
    })
  }
  
  if (!token) {
    return (
      <>
        {history.push('/')}
      </>
    )
  }

  return (
    <div className="account-wrapper">
      <div className="account-content">
        <h1>My Account</h1>
        <div className="account-content-details">
          <main>
            <h2>Profile</h2>
            <Formik
              initialValues={{
                first_name: user.first_name || '',
                last_name: user?.last_name || '',
                phone_number: user?.phone_number || '',
                province: user.address?.province || '',
                city: user.address?.city || '',
                street: user.address?.street || '',
                zip_code: user.address?.zip_code || '',
              }}
              enableReinitialize={true}
              onSubmit={ async (values) => {
                await handleUpdateUserProfile({...values});
              }}
            >
              {() => (
                <Form>
                  <div>
                    <label htmlFor="first_name">First Name</label>
                    <Field type="text" name="first_name"/>
                  </div>
                  <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Field type="text" name="last_name"/>
                  </div>
                  <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <Field type="tel" name="phone_number"/>
                  </div>
                  <div>
                    <label htmlFor="province">Province</label>
                    <Field type="text" name="province"/>
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <Field type="text" name="city"/>
                  </div>
                  <div>
                    <label htmlFor="street">Street</label>
                    <Field as="textarea" name="street"/>
                  </div>
                  <div>
                    <label htmlFor="zip_code">Zip Code</label>
                    <Field type="text" name="zip_code"/>
                  </div>
                  <br />
                  <button type="submit">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
            <h2>Password</h2>
            <Formik
              initialValues={{
                password: '',
                re_password: '',
              }}
            >
              {() => (
                <Form>
                  <div>
                    <label htmlFor="password">New password</label>
                    <Field type="password" name="password" required/>
                  </div>
                  <div>
                    <label htmlFor="re_password">Retype new password</label>
                    <Field type="password" name="re_password" required/>
                  </div>
                  <br />
                  <button type="submit">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </main>
          <aside>
            <div>
              <img src={process.env.PUBLIC_URL + '/images/product/gambar_belum_ada.jpg'} alt="gambar lom ada" />
              <br />
              <input type="file" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default withRouter(MyAccount);