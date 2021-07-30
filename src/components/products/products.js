import './products.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ReactStars from "react-rating-stars-component";
import { Formik, Form, Field } from 'formik';
import { withRouter, Link } from 'react-router-dom';

const Products = (props) => {
  const { history, category } = props;
  const [data, setData] = useState({
    data: [],
    lenght: 0
  });
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 9;
  let query;
  let queryString = '?' + (window.location.href.split('?')[1] || '');

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  const filterEmptyValue = (valueObject) => {
    return valueObject.map(el => {
      return Object.keys(el).reduce((newObj, key) => {
        const value = el[key];
        if (value !== "") {
          newObj[key] = value;
        }
        return newObj;
      }, {});
    })[0];
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${category + queryString}`)
      .then((res) => {
        const data = res.data;
        const slicedData = data.slice(offset, offset + perPage);

        setPageCount(Math.ceil(data.length / perPage))
        setData({
          data: slicedData,
          lenght: data.length
        });
      })
      .catch((e) => console.log(e.message));
  }, [currentPage]);

  const fetchDataQuery = (formValues) => {
    const filteredObject = filterEmptyValue(formValues);
    const filteredArray = Object.keys(filteredObject).map((k) => `${k}=${filteredObject[k]}`)

    query = filteredArray;
    queryString = '?' + query.join('&');

    axios.get(`http://localhost:8080/products/${category + queryString}`)
      .then((res) => {
        const data = res.data;
        const slicedData = data.slice(offset, offset + perPage);

        setPageCount(Math.ceil(data.length / perPage))
        setData({
          data: slicedData,
          lenght: data.length
        });
      })
      .catch((e) => console.log(e.message));
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset);
  }

  return (
    <div className="products-wrapper" key={props.key}>
      <div className="products-content">
        <h1 className="product-name-h1">Processor - {data.lenght} Product</h1>
        <div className="products-content-main">
          <aside className="product-filter-aside">
            <h3>Product Filters</h3>
            <Formik
              initialValues={{
                priceSort: "",
                minRating: "",
                soldSort: ""
              }}
              onSubmit={async (values) => {
                try {
                  const queries = [{
                    priceSort: values.priceSort,
                    soldSort: values.soldSort,
                    minRating: parseInt(values.minRating) || "",
                  }];
                  fetchDataQuery(queries);
                  history.push(`/${category + queryString}`);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {() => (
                <Form>
                  <label htmlFor="priceSort">Sort by price: </label>
                  <Field as="select" name="priceSort">
                    <option value="">-</option>
                    <option value="ASC">Ascending</option>
                    <option value="DSC">Descending</option>
                  </Field>
                  <label htmlFor="soldSort">Sort by sales: </label>
                  <Field as="select" name="soldSort">
                    <option value="">-</option>
                    <option value="ASC">Ascending</option>
                    <option value="DSC">Descending</option>
                  </Field>
                  <label htmlFor="minRating">Minimum rating: </label>
                  <Field as="select" name="minRating">
                    <option value="">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Field>
                  <br />
                  <button type="submit">
                    Filter
                  </button>
                </Form>
              )}
            </Formik>
          </aside>
          <main>
            <div className="products-grid">
              {data.data.map((elem) => {
                return (
                  <div className="product-item-wrapper">
                    <div key={elem._id} className="product-item">
                      <img src={process.env.PUBLIC_URL + '/images/product/gambar_belum_ada.jpg'} alt="" />
                      <div>
                        <Link to={`/product-detail/${elem._id}`} >
                          <p className="product-name-link">{elem.product_name}</p>
                        </Link>
                        <div>
                          <span>{formatter.format(elem.price)}</span>
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={elem.avgRating}
                            edit={false}
                          />
                        </div>
                      </div>
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

export default withRouter(Products);