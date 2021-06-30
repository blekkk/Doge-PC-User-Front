import { useState, useEffect } from 'react';
import Home from '../home/home';
import SignUp from '../auth/signup';
import SignIn from '../auth/signin';
import {
  Switch,
  Route,
} from "react-router-dom";

const Main = (props) => {
  const { token, setToken } = props;

  return (
    <main>
      <Switch>
        <Route exact={true} path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <SignUp token={ token } />
        </Route>
        <Route path='/signin'>
          <SignIn token={ token } setToken={ setToken } />
        </Route>
      </Switch>
    </main>
  )
}

export default Main;