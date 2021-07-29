import './productDetail.css'
import { useState, useEffect } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import axios from 'axios'

const ProductDetail = (props) => {
    const [review, setReview] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/user')
            .then((res) => setReview(res.data))
            .catch((e) => console.log(e.message));
    })

    const addToCart = () => {
        alert("Added to Cart")
        if (window.confirm("Go to cart now?")) {
            window.location = "/cart"
        }
    }

    return (
        <div>
            <div className="detail-product">
                <img src={process.env.PUBLIC_URL + 'images/product/gambar_belum_ada.jpg'} alt="" />
                <div className="detail-description">
                    <h2>Product Name</h2>
                    <h3>Rp 123.000</h3>
                    <p>Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi </p>
                    <ul>
                        <li>
                            <p>Category     :</p>
                        </li>
                        <li>
                            <p>Sub-Category :</p>
                        </li>
                        <li>
                            <p>Brand        :</p>
                        </li>
                        <li>
                            <p>Blabla       :</p>
                        </li>
                    </ul>
                    <button onClick={addToCart} className="cart-btn"> <h2>ADD TO CART</h2></button>
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