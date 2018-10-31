import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import ListBooks from './ListBooks';
import {AddBookLink} from './BooksLink';
import SearchBook from './SearchBook'; 


class Books extends Component {
  
  render() {

    return (
      <div>
        <div>
          <SearchBook/>
          <AddBookLink/>
          </div>

        <Segment>
          <ListBooks/> 
        </Segment>
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

