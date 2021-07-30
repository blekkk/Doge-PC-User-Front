import './productDetail.css'
import { useState, useEffect } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { useParams } from 'react-router'
import axios from 'axios'

const ProductDetail = (props) => {
  const { token, setToken, uid, setUid } = props
  const [review, setReview] = useState([])
  const [product, setProduct] = useState({})
  const [user, setUser] = useState({})
  const { id } = useParams()
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((e) => console.log(e.message))
    console.log(product)

    axios.get('http://localhost:8080/user')
      .then((res) => setReview(res.data))
      .catch((e) => console.log(e.message))

    axios.get(`http://localhost:8080/user/${uid}`)
      .then((res) => setUser(res.data))
      .catch((e) => console.log(e.message))
    console.log(user)
  }, [])

  console.log(id)

  const handleAddToCart = () => {
    alert("Added to Cart")
    if (window.confirm("Go to cart now?")) {
      window.location = `/cart/${user._id}`
    }
  }
  console.log(token)
  const handleCartNotLoggedIn = () => {
    alert("Please sign in to continue")
    window.location = "/signin"
  }

  const addToCart = () => {
    if (token) {
      return (
        handleAddToCart()
      )
    } else {
      return (
        handleCartNotLoggedIn()
      )
    }
  }

  return (
    <div>
      <div className="detail-product">
        <img src={process.env.PUBLIC_URL + 'images/product/gambar_belum_ada.jpg'} alt="" />
        <div className="detail-description">
          <h2>{product.product_name}</h2>
          <h3>{formatter.format(product.price)}</h3>
          <p>Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi </p>
          <ul>
            <li>
              <p>Category     : {product.category?.main_category}</p>
            </li>
            <li>
              <p>Sub-Category : {product.category?.secondary_category}</p>
            </li>
            <li>
              <p>Brand        : {product.brand}</p>
            </li>
            <li>
              <p>Blabla       :</p>
            </li>
          </ul>
          <button onClick={() => addToCart()} className="cart-btn"> <h2>ADD TO CART</h2></button>
          {/* {user.cart.push(product)} */}
        </div>
      </div>
      <h3 style={{ margin: "50px 10px 10px 10px" }}>Reviews</h3>
      <div className="review-list-container">
        {review.map((elem) => {
          return (
            <div key={elem._id} className="user-review">
              <aside className="user-review-avatar"><IoPersonCircle /></aside>
              <p>{elem.first_name} {elem.last_name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default ProductDetail;