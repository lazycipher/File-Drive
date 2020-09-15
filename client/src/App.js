import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './store/actions/authActions';
import store from './store';
import AppNavbar from './Components/NavBar';
import './App.css';
import Profile from './Components/Profile';
import Dashboard from './Components/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Route exact path = "/">
          <AppNavbar />
          <Dashboard />
        </Route>
        <Route path = "/profile">
          <AppNavbar />
          <Profile />
        </Route>
      </Router>
      
      
      
    </Provider>
  );
}

export default App;
