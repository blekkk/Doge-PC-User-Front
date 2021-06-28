import './App.css';
import Header from './components/header/header';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './components/main/main';

const App = () => {
  return (
    <div>
      <Router >
        <Header />
        <Main />
      </Router>
    </div>
  )
}

export default App;
