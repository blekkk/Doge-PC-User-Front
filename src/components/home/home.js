import { useState, useEffect } from 'react';
import './home.css'

const Home = () => {
  return (
    <div>
      <div className="slider">
        <figure>
          <img src={process.env.PUBLIC_URL + 'images/banner/intel_banner.jpeg'}/>
          <img src={process.env.PUBLIC_URL + 'images/banner/rtx_banner.jpg'}/>
          <img src={process.env.PUBLIC_URL + 'images/banner/gigabyte_banner.jpg'}/>
          <img src={process.env.PUBLIC_URL + 'images/banner/samsung_banner.jpg'}/>
          <img src={process.env.PUBLIC_URL + 'images/banner/corsair_banner.jpg'}/>
        </figure>
      </div>
        
      <div className="product-container">
        <div className="product-item">
          <h2>New Release</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/intel_banner.jpeg'}/>
        </div>
        <div className="product-item">
          <h2>On Sale</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/samsung_banner.jpg'}/>
        </div>
        <div className="product-item">
          <h2>Best Seller</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/gigabyte_banner.jpg'}/>
        </div>
        <div className="product-item">
          <h2>Gaming Experience</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/rtx_banner.jpg'}/>
        </div>
      </div>
    </div>
  )
}

export default Home;