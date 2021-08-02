import './myTransactions.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

const MyTransactions = (props) => {
  const { token } = props;
  const [transactions, setTransactions] = useState([]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    axios.get('http://localhost:8080/checkout/user', {
      headers: {
        'auth-token': token
      }
    }).then((res) =>
      setTransactions(res.data)
    ).catch(e => console.log(e.message));
  }, [])

  const handleDisplayProduct = (index) => {
    const productArray = []
    for (let i = 0; i < transactions[index].products_info.length; i++) {
      productArray.push(
        <div className="myTransactions-product-item">
          <div className="wishlist-item-wrapper-image">
            <img src={process.env.PUBLIC_URL + '/images/product/gambar_belum_ada.jpg'} alt="gambar lom ada" />
          </div>
          <div>
            <p>{transactions[index].products_info[i].product_name}</p>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={transactions[index].products_info[i].average_rating}
              edit={false}
            />
            <p>{formatter.format(transactions[index].products_info[i].price)}</p>
            <p>Amount: {transactions[index].checkoutProduct[i].amount}</p>
          </div>
        </div>
      )
    }
    return productArray;
  }

  return (
    <div className="myTransactions-wrapper">
      <div className="myTransactions-content">
        <h1>MyTransactions</h1>
        {transactions.map((elem, index) => {
          return (
            <div className="myTransactions-description" key={elem._id}>
              <h2>Transaction Details: </h2>
              <p>Transaction ID: {elem._id}</p>
              <p>Payment method: {elem.payment_method}</p>
              <p>Buy date: {elem.buy_date}</p>
              <p>Shipment receipt: {elem.shipment_receipt}</p>
              <p>Shipment cost: {formatter.format(elem.shipment_cost)}</p>
              <p>Total price: {formatter.format(elem.total_price)}</p>
              <h2>Products: </h2>
              {handleDisplayProduct(index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyTransactions;