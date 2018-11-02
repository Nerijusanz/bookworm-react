import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';



import ServerError from '../../../messages/ServerError';
import SearchBlock from './SearchBlock';
import AddBook from './AddBook';
// import ListBooks from './ListBooks';


class Books extends Component {

  state={}
  
  render() {
    // -------------------------state-------------------
    const {serverErrors} = this.props.book; // redux: book reducer
    // ------------------------------------------------

    const serverErrorContent = serverErrors.global && <ServerError errors={serverErrors.global} />

    const selectedAddBookForm = this.props.book.searchBookObj.selectedBookStatus && <AddBook/>

    // const listBooks = (!this.props.book.searchBookObj.selectedBookStatus && this.props.book.books) && <ListBooks/>

    return (
      <div>
        
        {serverErrorContent}
        <SearchBlock/>
          
          {selectedAddBookForm}


      </div>
    )
  }
}

Books.propTypes={

    book: propTypes.shape({

      serverErrors: propTypes.shape({
        global: propTypes.arr,
      }).isRequired,

      books: propTypes.arr,

      searchBookObj: propTypes.shape({
        selectedBookStatus: propTypes.bool.isRequired,
        savedBookStatus: propTypes.bool.isRequired,
      }).isRequired
      
    }).isRequired
  
}
  

  
function mapStateToProps(state){

    return {

        book: state.book
    }
}
  
  
export default connect(mapStateToProps,{})(Books);

