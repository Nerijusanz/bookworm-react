import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import { Segment,Image,Grid, GridRow, GridColumn } from 'semantic-ui-react';

class ListBooks extends Component {

  onClickBookHandler = () => {

    console.log('clicked');

    
    /*
    const selectedBookObj = this.props.book.books.filter(book=>book.goodreadsId === item.value);

    this.props.searchBookSelected(selectedBookObj);
    */
    
}

  generateList = () => {

    const books = this.props.book.books;

    if(books.length < 1) return;

    const booksList = books.map((book,index)=>
        <GridRow key={index}>
          <GridColumn>
            <a onClick={this.onClickBookHandler}><h2>{book.title}</h2></a>
            <p><span>author:</span>&nbsp;{book.author}</p>
            <p><span>pages:</span>&nbsp;{book.pages}</p>
          </GridColumn>
          <GridColumn>
            <Image size="small" src={book.covers[0]} />
          </GridColumn>
        </GridRow>
    );

    return booksList;

  }



  render() {

    const booksList = this.generateList();

    return (
      <Segment>
        <Grid columns={2} stackable>
          {booksList}
        </Grid>
      </Segment>
    )
  }
}

ListBooks.propTypes = {

  book: propTypes.shape({

      loading: propTypes.bool.isRequired,
      books: propTypes.array.isRequired,

  }).isRequired,

}


function mapStateToProps(state){

  return {
      book: state.book
  }
}


export default connect(mapStateToProps,{})(ListBooks);
