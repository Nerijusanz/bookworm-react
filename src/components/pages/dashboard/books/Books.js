import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

// import ListBooks from './ListBooks';
// import {AddBookLink} from './BooksLink';
import ServerError from '../../../messages/ServerError';
import SearchBook from './SearchBook';
import AddBook from './AddBook'; 


class Books extends Component {

  state={}
  
  render() {
    // -------------------------state-------------------
    const {serverErrors} = this.props.book; // redux: book reducer
    // ------------------------------------------------

    const serverErrorContent = serverErrors.global && <ServerError errors={serverErrors.global} />

    const addBookForm = this.props.book.searchBookObj.selectedBookStatus && <Segment><AddBook/></Segment>

    return (
      <div>
        
        {serverErrorContent}

        <SearchBook/>

        {addBookForm}

      </div>
    )
  }
}

Books.propTypes={

    book: propTypes.shape({

      serverErrors: propTypes.shape({
        global: propTypes.arr,
      }).isRequired,

      searchBookObj: propTypes.shape({
        selectedBookStatus: propTypes.bool.isRequired,
      }).isRequired
      
    }).isRequired
  
}
  

  
function mapStateToProps(state){

    return {

        book: state.book
    }
}
  
  
export default connect(mapStateToProps,{})(Books);

