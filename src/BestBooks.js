import React from 'react';
import axios from 'axios';

class BestBooks extends React.Component{
  
  componentDidMount = async() => {
    const getBookData = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/books?user='michaelryan2895@gmail.com'`);
    console.log(getBookData.data);


  }

  render() {
    return(
      <h1>Books</h1>
    )
  }
}

export default BestBooks;