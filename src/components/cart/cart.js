import './cart.css'
import { useState } from 'react'

const Cart = (props) => {
  const [counter, setCounter] = useState(1)

  const handleIncrement = () => {
    setCounter(counter + 1);
  }

  const handleDecrement = () => {
    if (counter === 1) {
      document.getElementsByClassName("minus-button").disabled = true;
    }
    else {
      setCounter(counter - 1);
    }
  }

  const toogleSelectAll = () => {
    if (document.getElementById("select-all-checkbox").checked === true) {
      document.getElementById("product-checkbox").checked = true;
    }
    else {
      document.getElementById("product-checkbox").checked = false;
    }
  }

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="product-cart">
        <input type="checkbox" id="product-checkbox" />
        <img src={process.env.PUBLIC_URL + 'images/product/gambar_belum_ada.jpg'} alt="" />
        <div className="product-info-cart">
          <h3>Product name</h3>
          <p>Product Price</p>
          <button onClick={handleDecrement}>-</button>
          <span>{counter}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
      <div className="select-all-cart">
        <input type="checkbox" id="select-all-checkbox" onClick={toogleSelectAll} />
        <h3>Select All</h3>
      </div>
    </div>
  )
}
export default Cart;