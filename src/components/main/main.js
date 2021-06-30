import { useState, useEffect } from 'react';
import Home from '../home/home';
import SignUp from '../auth/signup';
import SignIn from '../auth/signin';
import Processor from '../products/processor/processor';
import GPU from '../products/gpu/gpu';
import RAM from '../products/ram/ram';
import Motherboard from '../products/motherboard/motherboard';
import Storage from '../products/storage/storage';
import PSU from '../products/psu/psu';
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
        <Route path='/processor'>
          <Processor />
        </Route>
        <Route path='/gpu'>
          <GPU />
        </Route>
        <Route path='/ram'>
          <RAM />
        </Route>
        <Route path='/motherboard'>
          <Motherboard />
        </Route>
        <Route path='/storage'>
          <Storage />
        </Route>
        <Route path='/psu'>
          <PSU />
        </Route>
      </Switch>
    </main>
  )
}

export default Main;