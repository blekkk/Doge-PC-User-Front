import './App.css';
import Header from './components/header/header';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './components/main/main';
import Footer from './components/footer/footer';
import useToken from './hooks/useToken';

const App = () => {
  const { token, setToken, deleteToken } = useToken();

  return (
    <div>
      <Router >
        <Header token={ token } deleteToken={ deleteToken }/>
        <Main token={ token } setToken={ setToken } />
        <Footer />
      </Router>
    </div>
  )
}

export default App;
