import React from 'react';
import './App.css';
import Users from './components/Users'
const axios = require('axios');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: []
    }
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:8080/users')
    this.setState({
      apiData: response.data
    });
  }

  render() {
    console.log(this.state.apiData);
    return(
      <>
      <div className='wrapper'>
         {this.state.apiData.map((userData, key) => {
          return(
            <Users  data={userData} key={key}/>
          )
        })} 
      </div>
      </>
    )
  }
}

export default App;
