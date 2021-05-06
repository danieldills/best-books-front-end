import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal.js';

class BestBooks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      name: '',
      author: '',
      description: '',
      status: '',
      updateBook: '',
      isUpdating: false
    }
  }

  handleNameI = (e) => {
    this.setState({ name: e.target.value });
  }

  handleAuthorI = (e) => {
    this.setState({ author: e.target.value });
  }

  handleDescriptionI = (e) => {
    this.setState({ description: e.target.value });
  }

  handleStatusI = (e) => {
    this.setState({ status: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.fetchUserData();
  }

  displayModal = () => {
    this.setState({ displayModal: true });
  }

  removeModal = () => {
    this.setState({ displayModal: false });
  }

  fetchUserData = () => {
    axios.get(`${process.env.REACT_APP_DATABASE_URL}/users/${this.props.auth0.user.email}`)
      .then(serverResponse => {
        console.log(serverResponse.data, 'working');
        this.setState({
          books: serverResponse.data[0].books
        })
      });
  }

  handleCreateBook = (e) => {
    e.preventDefault();
    console.log('name', this.handleNameI);
    axios.post(`${process.env.REACT_APP_DATABASE_URL}/books`, {
      email: this.props.auth0.user.email,
      name: this.state.name,
      author: this.state.author,
      description: this.state.description,
      status: this.state.status
    }).then(response => {
      this.setState({
        books: response.data
      })
      this.removeModal();

      // add a .catch
      // delete button crashes back end
    });
  }

  handleUpdate = (bookToUpdate) => {
    console.log('updating book', bookToUpdate);
    this.setState({
      name: bookToUpdate.name,
      author: bookToUpdate.author,
      description: bookToUpdate.description,
      status: bookToUpdate.status,
      updateBook: bookToUpdate._id,
      isUpdating: true
    });
  }


  handleDelete = (id) => {
    console.log(id);
    axios.delete(`${process.env.REACT_APP_DATABASE_URL}/books/${id}?user=${this.props.auth0.user.email}`).then(response => {
      this.setState({
        books: response.data
      })
    })
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
        <BookFormModal
          displayModal={this.state.displayModal}
          showModal={this.displayModal}
          hideModal={this.removeModal}
          addInfo={this.handleCreateBook}
          handleNameI={this.handleNameI}
          handleAuthorI={this.handleAuthorI}
          handleDescriptionI={this.handleDescriptionI}
          handleStatusI={this.handleStatusI}
        />
        <h1>Books</h1>
        <div>
          <Carousel>
            {this.state.books && this.state.books.map((book, i) =>
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" src="https://via.placeholder.com/500" alt='slide' />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <h6>{book.author}</h6>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                  <Button onClick = {() => this.handleDelete(book._id)}>Delete Book</Button>
                  <Button onClick = {() => this.handleUpdate(book._id)}>Update Book</Button>
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