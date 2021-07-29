import './cart.css'

const Cart = (props) => {
    return (
        <div className="cart-container">
            <h1>Cart</h1>
            <div className="product-cart">
                <img src={process.env.PUBLIC_URL + 'images/product/gambar_belum_ada.jpg'} alt="" />
                <div className="product-info-cart">
                    <h3>Product name</h3>
                    <p>Product Price</p>
                </div>
            </div>
        </div>
    )
}
export default Cart;