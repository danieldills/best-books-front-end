import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel'
import { CarouselItem } from 'react-bootstrap';


class BestBooks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    const getBookData = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/books?user=${user.email}`);
    console.log(getBookData.data);
    this.setState({
      books: getBookData.data.books
    });


  }

  render() {
    return (
      <>
        <h1>Books</h1>
        <div>
          <Carousel>
            {this.state.books && this.state.books.map((book, i) =>
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" src="https://via.placeholder.com/150" alt='slide'/>
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <h6>{book.author}</h6>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        </div>
      </>
    )
  }
}

export default withAuth0(BestBooks);