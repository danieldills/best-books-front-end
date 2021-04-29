import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './Login.js';
import MyFavoriteBooks from './MyFavoriteBooks.js';
import Profile from './Profile.js';
import axios from 'axios';

class App extends React.Component {

  let getBookData = await axios.get(`${process.env.}`)

  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log('app', this.props);

    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* DONE: TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <MyFavoriteBooks /> : <Login />}
              </Route >
              <Route exact path="/profile" >
              {/* DONE: TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                <Profile />
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
