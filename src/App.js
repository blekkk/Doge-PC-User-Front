import './App.css';
import Header from './components/header/header';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './components/main/main';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div>
      <Router >
        <Header />
        <Main />
        <Footer />
      </Router>
    </div>
  )
}

export default App;
