import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import { Segment,Image,Grid, GridRow, GridColumn } from 'semantic-ui-react';

import {getBooks} from '../../../../actions/UserBook';


class UserBooks extends Component {


  componentDidMount(){

    this.getBooks();

  }


  getBooks = () => {

    this.props.getBooks();

  }

  generateList = () => {

    const userbooks = this.props.userbook.books;

    if(userbooks.length < 1)
      return <GridRow><p>books list empty</p></GridRow>;
    

    const userbooksList = userbooks.map((book,index)=>
        <GridRow key={index}>
          <GridColumn>
            <h2>{book.title}</h2>
            <p><span>author:</span>&nbsp;{book.author}</p>
            <p><span>pages:</span>&nbsp;{book.pages}</p>
          </GridColumn>
          <GridColumn>
            <Image size="small" src={book.cover} />
          </GridColumn>
        </GridRow>
    );

    return userbooksList;

  }



  render() {

    const userbooks = this.generateList();

    return (
      <Segment>
        <Grid columns={2} stackable>
          {userbooks}
        </Grid>
      </Segment>
    )
  }
}

UserBooks.propTypes = {

  userbook: propTypes.shape({
      books: propTypes.array.isRequired,
  }).isRequired,
  getBooks: propTypes.func.isRequired,


}


function mapStateToProps(state){

  return {
      userbook: state.userbook
  }
}


export default connect(mapStateToProps,{getBooks})(UserBooks);
