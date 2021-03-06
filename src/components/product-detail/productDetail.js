import './productDetail.css'
import { useState, useEffect } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { useParams, withRouter } from 'react-router'
import ReactStars from "react-rating-stars-component";
import axios from 'axios'
import { nanoid } from 'nanoid';

const ProductDetail = (props) => {
  const { token, history } = props
  const [product, setProduct] = useState({ reviews: [] })
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState({ cartProducts: [] })
  const { id } = useParams()
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => console.log(e.message))

    axios.get('http://localhost:8080/user', {
      headers: {
        'auth-token': token
      }
    }).then((res) =>
      setUser(res.data)
    ).catch(e => console.log(e.message));

    axios.get('http://localhost:8080/cart', {
      headers: {
        'auth-token': token
      }
    }).then((res) =>
      setCart(res.data)
    ).catch(e => console.log(e.message));

  }, [])

  const handleAddToWishlist = async () => {
    const wishlistObject = {
      productId: id,
    };
    try {
      await axios.put('http://localhost:8080/user/wishlist/add', wishlistObject, {
        headers: {
          'auth-token': token
        }
      });
      alert('Added to wishlist!')
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleRemoveFromWishlist = async () => {
    const productId = {
      productId: id
    };
    try {
      await axios.put('http://localhost:8080/user/wishlist/remove', productId, {
        headers: {
          'auth-token': token
        }
      });
      alert('Removed from wishlist!')
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  const checkWishlistExist = () => {
    let status = false;
    if (user.wishlist.length === 0)
      return status

    Array.prototype.forEach.call(user.wishlist, (elemId) => {
      if (elemId === id)
        status = true;
    })

    return status;
  }

  const wishListButton = () => {
    if (token) {
      if (checkWishlistExist()) {
        return (
          <button onClick={() => handleRemoveFromWishlist()} className="cart-btn"> <span>REMOVE FROM WISHLIST</span></button>
        )
      }
      else {
        return (
          <button onClick={() => handleAddToWishlist()} className="cart-btn"> <span>ADD TO WISHLIST</span></button>
        )
      }
    }
    return;
  }
  const handleAddToCart = async () => {
    const productCart = {
      productId: id,
      amount: 1
    };
    try {
      await axios.put('http://localhost:8080/cart', productCart, {
        headers: {
          'auth-token': token
        }
      });
      alert('Added to cart!')
      if (window.confirm("Go to cart now?")) {
        history.push('/cart');
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/cart/${id}`, {
        headers: {
          'auth-token': token
        }
      });
      alert('Removed from cart!')
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleCartNotLoggedIn = () => {
    alert("Please sign in to continue")
    history.push('/signin');
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

  const checkCartProductExist = () => {
    let status = false
    if (cart?.cartProducts?.length === 0) {
      return status
    }

    Array.prototype.forEach.call(cart?.cartProducts, (elem) => {
      if (elem.productId === id) {
        status = true;
      }
    })
    return status;
  }

  const cartButton = () => {
    if (checkCartProductExist()) {
      return (
        <button onClick={() => handleRemoveFromCart()} className="cart-btn"> <span>REMOVE FROM CART</span></button>
      )
    }
    else {
      return (
        <button onClick={() => addToCart()} className="cart-btn"> <span>ADD TO CART</span></button>
      )
    }
  }

  const showReviews = () => {
    if (!product?.reviews) {
      return (
        <h2>No reviews for this product</h2>
      )
    }

    return product?.reviews?.map((elem) => {
      return (
        <div key={nanoid()} className="user-review">
          <div className="user-review-name">
            <span className=" user-review-avatar"><IoPersonCircle /></span>
            <div className="user-review-name-rating">
              <span>{elem.name}</span>
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                value={elem.rating}
                edit={false}
              />
            </div>
          </div>
          <div>
            <p>{elem.comment}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <div className="detail-product">
        <img src={process.env.PUBLIC_URL + '/images/product/gambar_belum_ada.jpg'} alt="" />
        <div className="detail-description">
          <h2>{product.product_name}</h2>
          <div>
            <h3>{formatter.format(product.price)}</h3>
            {console.log(product)}
          </div>
          <p><b>Rating: {product.average_rating}</b> (react-stars doesn't work, idk why)</p>
          {/* <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={productRating}
            edit={false}
          /> */}
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
          </ul>
          <div className="detail-product-buttons">
            {cartButton()}
            {user !== null ? wishListButton() : ''}
          </div>
        </div>
      </div>
      <h3 style={{ margin: "50px 10px 10px 10px" }}>Reviews</h3>
      <div className="review-list-container">
        { showReviews() }
      </div>
    </div>
  )

}

export default withRouter(ProductDetail);