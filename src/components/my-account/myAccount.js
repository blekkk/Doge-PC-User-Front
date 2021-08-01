import './myAccount.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const MyAccount = (props) => {
  const { token, history } = props;
  const [user, setUser] = useState({ wishlist: [] });
  const [wishlistArray, setWishlistArray] = useState([]);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  useEffect(() => {
    axios.get('http://localhost:8080/user', {
      headers: {
        'auth-token': token
      }
    }).then((res) =>
      setUser(res.data)
    ).catch(e => console.log(e.message));
  }, []);

  useEffect(() => {
    if (user.wishlist.length !== 0) {
      user.wishlist.forEach((elemId) => {
        axios.get(`http://localhost:8080/product/${elemId}`)
          .then((res) => {
            setWishlistArray(oldArr => [...oldArr, res.data]);
          }).catch(e => console.log(e.message));
      })
    }
  }, [user])

  const handleUpdateUserProfile = async (data) => {
    return await axios.put('http://localhost:8080/user', data, {
      headers: {
        'auth-token': token
      }
    })
  }

  const handleChangePassword = async (data) => {
    return await axios.put('http://localhost:8080/user/changepassword', data, {
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
              onSubmit={async (values) => {
                try {
                  await handleUpdateUserProfile({ ...values });
                } catch (e) {
                  console.log(e.message);
                }
              }}
            >
              {() => (
                <Form>
                  <div>
                    <label htmlFor="first_name">First Name</label>
                    <Field type="text" name="first_name" required />
                  </div>
                  <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Field type="text" name="last_name" />
                  </div>
                  <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <Field type="tel" name="phone_number" />
                  </div>
                  <div>
                    <label htmlFor="province">Province</label>
                    <Field type="text" name="province" />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <Field type="text" name="city" />
                  </div>
                  <div>
                    <label htmlFor="street">Street</label>
                    <Field as="textarea" name="street" />
                  </div>
                  <div>
                    <label htmlFor="zip_code">Zip Code</label>
                    <Field type="text" name="zip_code" />
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
              validate={(values) => {
                const error = {};
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(values.password)) {
                  error.password = 'Password must be at least 8 characters, contains at least 1 UPPERCASE, 1 LOWERCASE, 1 NUMBER, and 1 SYMBOL!'
                } else if (values.password !== values.re_password) {
                  error.re_password = 'Password does not match!';
                }
                return error;
              }}
              onSubmit={async (values) => {
                try {
                  const data = {
                    password: values.password
                  }
                  await handleChangePassword(data);
                } catch (e) {
                  console.log(e.message);
                }
              }}
            >
              {() => (
                <Form>
                  <div>
                    <label htmlFor="password">New password</label>
                    <Field type="password" name="password" required />
                    <ErrorMessage name="password" component="div" className="form-error" />
                  </div>
                  <div>
                    <label htmlFor="re_password">Retype new password</label>
                    <Field type="password" name="re_password" required />
                    <ErrorMessage name="re_password" component="div" className="form-error" />
                  </div>
                  <br />
                  <button type="submit">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
            <h2>Wishlist</h2>
            {Array.prototype.map.call(wishlistArray, (item) => {
              return (
                <div className="wishlist-item-wrapper" key={item.productId}>
                  <div className="wishlist-item-wrapper-image">
                    <img src={process.env.PUBLIC_URL + '/images/product/gambar_belum_ada.jpg'} alt="gambar lom ada" />
                  </div>
                  <div className="wishlist-item-wrapper-details">
                    <Link to={`/product-detail/${item._id}`}>
                      <p>{item.product_name}</p>
                    </Link>
                    <p>{formatter.format(item.price)}</p>
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      value={item.average_rating}
                      edit={false}
                    />
                  </div>
                </div>
              )
            })}
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