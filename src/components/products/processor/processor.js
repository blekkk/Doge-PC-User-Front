import './processor.css';
import '../products.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Processor = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/products/Processor`)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e.message));
  }, []);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  console.log(data);

  return (
    <div className="products-wrapper">
      <div className="products-content">
        <h1>Processor - {data.length} Product</h1>
        <div className="products-content-main">
          <aside>
            <h3>Product Filters</h3>
          </aside>
          <main>
            {data.map((elem) => {
              return (
                <div key={elem._id} className="product-item">
                  <img src={process.env.PUBLIC_URL + 'images/product/gambar_belum_ada.jpg'} alt=""/>
                  <p>{elem.product_name}</p>
                  <div>
                    <span>{formatter.format(elem.price)}</span>
                    <span>{elem.average_rating}</span>
                  </div>
                </div>
              )
            })}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Processor;