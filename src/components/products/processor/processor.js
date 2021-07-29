import { Fragment } from 'react';
import './processor.css';
import '../products.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';

const Processor = (props) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/products/Processor`)
      .then((res) => {
        const data = res.data;
        setDataCount(data.length);
        const slicedData = data.slice(offset, offset + perPage);
        console.log(slicedData);

        setPageCount(Math.ceil(data.length / perPage))
        setData(slicedData);
      })
      .catch((e) => console.log(e.message));
  }, [currentPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset);
  }

  console.log(data);

  return (
    <div className="products-wrapper">
      <div className="products-content">
        <h1 className="product-name-h1">Processor - {dataCount} Product</h1>
        <div className="products-content-main">
          <aside className="product-filter-aside">
            <h3>Product Filters</h3>
          </aside>
          <main>
            <div className="products-grid">
              {data.map((elem) => {
                return (
                  <div key={elem._id} className="product-item">
                    <img src={process.env.PUBLIC_URL + 'images/product/gambar_belum_ada.jpg'} alt="" />
                    <NavLink to="/product-detail">
                      <p className="product-name-link">{elem.product_name}</p>
                    </NavLink>
                    <div>
                      <span>{formatter.format(elem.price)}</span>
                      <span>{elem.average_rating}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="products-pagination">
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Processor;