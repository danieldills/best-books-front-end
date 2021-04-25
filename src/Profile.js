import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
// copy from starter code from Auth0
class Profile extends Component {

  render() {
    // `this.props.auth0` has all the same properties as the `useAuth0` hook
    const { user, isAuthenticated } = this.props.auth0;
    console.log(user);
    return isAuthenticated && (
    // <div>Hello
    //   {user.name}
    //   <img src={user.picture} alt={user.name} />
    //   {user.email}

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user.picture} alt={user.name} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.email}</Card.Text>
        </Card.Body>
      </Card>

    // </div>
    )
  }
}

export default withAuth0(Profile);
