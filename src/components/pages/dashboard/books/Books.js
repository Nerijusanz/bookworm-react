import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import ListBooks from './ListBooks';
import {AddBookLink} from './BooksLink'; 

class Books extends Component {
  
  render() {

    return (
      <div>
          <AddBookLink/>
         <ListBooks/> 
          
      </div>
    )
  }
}

Books.propTypes={

    book: propTypes.shape({
      books: propTypes.array.isRequired
    }).isRequired
  
}
  

  
function mapStateToProps(state){

    return {

        book: state.book
    }
}
  
  
export default connect(mapStateToProps,{})(Books);

