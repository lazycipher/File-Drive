import React from 'react';
import { connect } from 'react-redux';
import AppNavbar from '../NavBar';
import Profile from '../Profile';
import Dashboard from '../Dashboard';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Spinner from '../Spinner';

const Home = ({isLoading}) => {
  return (
    <Router>
        <Route exact path = "/">
            {!isLoading?
            <>
                <AppNavbar />
                <Dashboard />
            </>
            :<Spinner />}
        </Route>
        <Route path = "/profile">
            {!isLoading?
            <>
                <AppNavbar />
                <Profile />
            </>
            :<Spinner />}
        </Route>
    </Router> 
  );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
    }
}

export default connect(mapStateToProps, null)(Home)
