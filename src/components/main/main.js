import Home from '../home/home';
import SignUp from '../auth/signup';
import SignIn from '../auth/signin';
import ProductDetail from '../product-detail/productDetail';
import Cart from '../cart/cart';
import Products from '../products/products';
import MyAccount from '../my-account/myAccount';
import Checkout from '../checkout/checkout';
import SearchPage from '../searchpage/searchPage';
import AboutUs from '../about-us/aboutUs';
import MyTransactions from '../my-transactions/myTransactions';
import {
  Switch,
  Route,
} from "react-router-dom";
import { nanoid } from 'nanoid';

const Main = (props) => {
  const { token, setToken, uid, setUid } = props;

  return (
    <main>
      <Switch>
        <Route exact={true} path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <SignUp token={token} />
        </Route>
        <Route path='/signin'>
          <SignIn token={token} setToken={setToken} uid={uid} setId={setUid} />
        </Route>
        <Route path='/Processor'>
          <Products key={nanoid()} category="Processor" />
        </Route>
        <Route path='/GPU'>
          <Products key={nanoid()} category="GPU" />
        </Route>
        <Route path='/RAM'>
          <Products key={nanoid()} category="RAM" />
        </Route>
        <Route path='/Motherboard'>
          <Products key={nanoid()} category="Motherboard" />
        </Route>
        <Route path='/Storage'>
          <Products key={nanoid()} category="Storage" />
        </Route>
        <Route path='/PSU'>
          <Products key={nanoid()} category="PSU" />
        </Route>
        <Route path='/search'>
          <SearchPage key={nanoid()} />
        </Route>
        <Route path='/product-detail/:id'>
          <ProductDetail token={token} />
        </Route>
        <Route path='/cart'>
          <Cart token={token} />
        </Route>
        <Route path='/about-us'>
          <AboutUs />
        </Route>
        <Route path='/my-transactions'>
          <MyTransactions token={token}/>
        </Route>
        <Route path='/account'>
          <MyAccount token={token} />
        </Route>
        <Route path='/checkout'>
          <Checkout token={token} />
        </Route>
      </Switch>
    </main>
  )
}

export default Main;