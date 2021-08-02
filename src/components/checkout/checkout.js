import "./checkout.css";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { nanoid } from "nanoid";

const Checkout = (props) => {
  const { token } = props;
  const [cart, setCart] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [user, setUser] = useState([])
  let totalPrice = 0    
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/cart", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => setCart(res.data))
      .catch((e) => console.log(e.request));
    
    axios.get("http://localhost:8080/user", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => setUser(res.data))
      .catch((e) => console.log(e.request));
  }, []);

  useEffect(() => {
    for (let i = 0; i < cart.cartProducts?.length; i++) {
      getCartProductDetail(cart.cartProducts[i].productId);
    }
  }, [cart]);

  const clearCartList = async () => {
    return await axios.delete(`http://localhost:8080/cart`, {
      headers: {
        "auth-token": token,
      },
    })
  }

  const getCartProductDetail = (id) => {
    axios.get(`http://localhost:8080/product/${id}`)
      .then((res) => setCartProduct((array) => [...array, res.data]))
      .catch((e) => console.log(e.message));
  };

  const handlePostTransaction = async (data) => {
    return await axios.post(`http://localhost:8080/checkout/all`, data, {
      headers: {
        "auth-token": token,
      },
    })
  }
  
  const orderInfo = useFormik({
    initialValues: {
      province: user?.address?.province ||"",
      city: user?.address?.city||"",
      street: user?.address?.street||"",
      zip_code: user?.address?.zip_code||"",
      paymentMethod: "",
    },
    enableReinitialize: true,    
    onSubmit: async (values) => {   
      // const shipmentCost = Math.floor(Math.random() * 40000) + 20000
      const finalPrice = totalPrice+22000      
      const finalObject = {
        address: {
          province: values.province,
          city: values.city,
          street: values.street,
          zip_code: values.zip_code
        },
        payment_method: values.paymentMethod,
        checkoutProduct: cart?.cartProducts,
        shipment_cost: 22000,
        shipment_receipt: nanoid(),
        total_price: finalPrice
      }
      try {
        await handlePostTransaction(finalObject)
        await clearCartList()
        alert("ORDER SUCCESS, ENJOY!")
      } catch {
        alert("Transaction failed")
      }
    },
  });

  const showOrderInfoInput = () => {
    return (
      <div className="order-info">
        {/* RECIPIENT ADDRESS */}
        <form onSubmit={orderInfo.handleSubmit}>
          <h2>Recipient Address</h2>
          <div className="form-alamat">
            <div>
              <label htmlFor="province">Province</label>
              <input
                id="province"
                name="province"
                type="text"
                onChange={orderInfo.handleChange}
                value={orderInfo.values.province}
              />
              <br />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                onChange={orderInfo.handleChange}
                value={orderInfo.values.city}
              />
              <br />
            </div>
            <div>
              <label htmlFor="street">Street</label>
              <input
                id="street"
                name="street"
                type="text"
                onChange={orderInfo.handleChange}
                value={orderInfo.values.street}
              />
              <br />
            </div>
            <div>
              <label htmlFor="zip_code">ZIP Code</label>
              <input
                id="zip_code"
                name="zip_code"
                type="text"
                onChange={orderInfo.handleChange}
                value={orderInfo.values.zip_code}
              />
              <br />
            </div>
          </div>

          {/* PAYMENT METHOD*/}
          <h2>Payment Method</h2>
          <div className="payment-method-checkout">
            <div>
              <input
                required
                id="credit-card"
                name="paymentMethod"
                type="radio"
                onChange={orderInfo.handleChange}
                value="credit-card"
              />
              <label htmlFor="credit-card">Credit Card</label>
              <br />
            </div>
            <div>
              <input
                id="debit-card"
                name="paymentMethod"
                type="radio"
                onChange={orderInfo.handleChange}
                value="debit-card"
              />
              <label htmlFor="debit-card">Debit Card</label>
              <br />
            </div>
            <div>
              <input
                id="transfer"
                name="paymentMethod"
                type="radio"
                onChange={orderInfo.handleChange}
                value="transfer"
              />
              <label htmlFor="transfer">Transfer</label>
              <br />
            </div>
          </div>

          <div className="make-order">
            {checkProductStock()}
            <h2>Total : {formatter.format(totalPrice+22000)}</h2>
            <button className="make-order-btn" type="submit">
              Make Order
            </button>
          </div>
        </form>
      </div>
    );
  };

  const showProduct = () => {
    if (cartProduct.length > 0) {
      return cart.cartProducts.map((elem, index) => {
        return (
          <div className="product-checkout-wrapper">
            <div
              key={cartProduct[index]?._id}
              className="product-checkout-item"
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/product/gambar_belum_ada.jpg"
                }
                alt=""
              />
              <div className="product-info-checkout">
                <h3>{cartProduct[index]?.product_name}</h3>
                <span> Quantity : {elem.amount} </span>
                <p>
                  Total Price : {formatter.format(cartProduct[index]?.price*elem.amount)}
                </p>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <p>The Cart is Empty...</p>;
    }
  };

  const showOrderDetail = () => {
    return (
      <div className="order-detail">
        <h2>Order Detail</h2>
        <p>Subtotal for product : {formatter.format(totalPrice)}</p>
        <p>Subtotal for delivery : {formatter.format(22000)}</p>
      </div>
    );
  };

  const getTotalPrice = () => {
    let sum = 0;

    if (cartProduct.length > 0) {
      cart.cartProducts.map((elem, index) => {
        return (sum += (cartProduct[index]?.price * elem.amount));
      });
    }
    
    totalPrice = sum
  };

  const checkProductStock = () => {
    
  }

  return (
    <div className="checkout-wrapper">
      <h1>Checkout</h1>
      {getTotalPrice()}
      {showProduct()}
      {showOrderDetail()}
      {showOrderInfoInput()}
    </div>
  );
};

export default Checkout;
