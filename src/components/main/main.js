import { useState, useEffect } from 'react';
import Home from '../home/home';
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
      </Switch>
    </main>
  )
}

export default Main;