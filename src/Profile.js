import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
// copy from starter code from Auth0
class Profile extends Component {

  render() {
    // `this.props.auth0` has all the same properties as the `useAuth0` hook
    const { user } = this.props.auth0;
    console.log(user);
    return (<div>Hello
      {user.name}
      <img src={user.picture} alt={user.name} />
      {user.email}

    </div>
    )
  }
}

export default withAuth0(Profile);
