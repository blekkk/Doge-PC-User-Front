import "./cart.css";
import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";

const Cart = (props) => {
  const { token, history } = props;
  const [cart, setCart] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/cart", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => setCart(res.data))
      .catch((e) => console.log(e.request));
  }, []);

  useEffect(() => {
    for (let i = 0; i < cart.cartProducts?.length; i++) {
      getCartProductDetail(cart.cartProducts[i].productId);
    }
  }, [cart]);

  const updateCartProduct = () => {
    axios
      .get("http://localhost:8080/cart", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => setCart(res.data))
      .catch((e) => console.log(e.request));
  };

  const getCartProductDetail = (id) => {
    axios
      .get(`http://localhost:8080/product/${id}`)
      .then((res) => setCartProduct((array) => [...array, res.data]))
      .catch((e) => console.log(e.message));
  };

  const handleRemoveCartProduct = async (prodId) => {
    if (window.confirm("Remove product from cart?")) {
      axios.delete(`http://localhost:8080/cart/${prodId}`, {
        headers: {
          "auth-token": token,
        },
      });
      setCartProduct([]);
    }
    await updateCartProduct();
  };

  const updateCartAmount = async () => {
    try {
      await axios.put(`http://localhost:8080/cart/update`, cart, {
        headers: {
          "auth-token": token,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleIncrement = (index) => {
    let tempCart = cart;

    if (cartProduct[index].stock === tempCart.cartProducts[index].amount) {
      document.getElementsByClassName("plus-button").disabled = true;
    } else {
      tempCart.cartProducts[index].amount += 1;
      setCart({ ...tempCart });
      updateCartAmount()
    }
  };

  const handleDecrement = (index) => {
    let tempCart = cart;

    if (tempCart.cartProducts[index].amount === 1) {
      handleRemoveCartProduct(tempCart.cartProducts[index].productId);
    } else {
      tempCart.cartProducts[index].amount -= 1;
      setCart({ ...tempCart });
      updateCartAmount()
    }
  };

  const getTotalPrice = () => {
    let sum = 0;

    if (cartProduct.length > 0) {
      cart.cartProducts.map((elem, index) => {
        return (sum += (cartProduct[index]?.price * elem.amount));
      });
    }

    return <h2>Total : {formatter.format(sum)}</h2>;
  };

  const handleCheckout = () => {
    if (cartProduct.length > 0) {
      history.push("/checkout");
    } else {
      document.getElementsByClassName("checkout-btn").disabled = true;
    }
  };

  const showProduct = () => {
    if (cartProduct.length > 0) {
      return cart.cartProducts.map((elem, index) => {
        return (
          <div className="product-cart-wrapper">
            <div key={cartProduct[index]?._id} className="product-cart-item">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/product/gambar_belum_ada.jpg"
                }
                alt=""
              />
              <div className="product-info-cart">
                <h3>{cartProduct[index]?.product_name}</h3>
                <p>{formatter.format(cartProduct[index]?.price)}</p>
                <button
                  className="minus-button"
                  onClick={() => handleDecrement(index)}
                >
                  -
                </button>
                <span> {elem.amount} </span>
                <button className="plus-button" onClick={() => handleIncrement(index)}>+</button>
                <span> (Available stock: {cartProduct[index]?.stock}) </span>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <p>The Cart is Empty...</p>;
    }
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="product-cart-list">{showProduct()}</div>
      <div className="total-price">{getTotalPrice()}</div>
      <button className="checkout-btn" onClick={() => handleCheckout()}>
        <span>CHECKOUT</span>
      </button>
    </div>
  );
};
export default withRouter(Cart);
