import './home.css'

const autoSlider = () => {
  var counter = 1;
  setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 5) {
      counter = 1;
    }
  }, 5000);
}

const Home = () => {
  return (
    <div>
      {/* image slider */}
      <div className="slider">
        <div className="slides">
          <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" />
          <input type="radio" name="radio-btn" id="radio5" />

          <div className="slide first">
            <img src={process.env.PUBLIC_URL + 'images/banner/intel_banner.jpeg'} />
          </div>
          <div className="slide">
            <img src={process.env.PUBLIC_URL + 'images/banner/rtx_banner.jpg'} />
          </div>
          <div className="slide">
            <img src={process.env.PUBLIC_URL + 'images/banner/gigabyte_banner.jpg'} />
          </div>
          <div className="slide">
            <img src={process.env.PUBLIC_URL + 'images/banner/samsung_banner.jpg'} />
          </div>
          <div className="slide">
            <img src={process.env.PUBLIC_URL + 'images/banner/corsair_banner.jpg'} />
          </div>

          <div className="navigation-auto">
            <div className="auto-btn1"></div>
            <div className="auto-btn2"></div>
            <div className="auto-btn3"></div>
            <div className="auto-btn4"></div>
            <div className="auto-btn5"></div>
          </div>
        </div>

        <div className="navigation-manual">
          <label for="radio1" className="manual-btn"></label>
          <label for="radio2" className="manual-btn"></label>
          <label for="radio3" className="manual-btn"></label>
          <label for="radio4" className="manual-btn"></label>
          <label for="radio5" className="manual-btn"></label>
        </div>
        {autoSlider()}
      </div>

      {/* product sale  */}
      <div className="product-container">
        <div className="product-item-sale">
          <h2>New Release</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/intel_banner.jpeg'} alt="" />
        </div>
        <div className="product-item-sale">
          <h2>On Sale</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/samsung_banner.jpg'} alt="" />
        </div>
        <div className="product-item-sale">
          <h2>Best Seller</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/gigabyte_banner.jpg'} alt="" />
        </div>
        <div className="product-item-sale">
          <h2>Gaming Experience</h2>
          <img src={process.env.PUBLIC_URL + 'images/banner/rtx_banner.jpg'} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home;