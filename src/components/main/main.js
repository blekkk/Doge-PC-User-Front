import { useState, useEffect } from 'react';
import Home from '../home/home';
import SignUp from '../auth/signup';
import SignIn from '../auth/signin';
import {
  Switch,
  Route,
} from "react-router-dom";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact={true} path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
      </Switch>
    </main>
  )
}

export default Main;