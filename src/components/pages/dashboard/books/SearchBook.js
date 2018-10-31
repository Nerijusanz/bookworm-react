import React, { Component } from 'react'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import { Form,Dropdown } from 'semantic-ui-react';

import {searchBook} from '../../../../actions/Books';

class SearchBook extends Component {

    state={
        query:''        
    }

    onSearchChangeHandler = (e) => {

        e.preventDefault();

        // clean out older timer if exists
        if(this.timer) clearTimeout(this.timer);

        const query = e.target.value;
        // trigger new timer
        this.timer = setTimeout(()=>{
            // note: do axios call to server after 1s, when stop input typing!!!
            this.setState({query});
            this.props.searchBook(query)

        },1000);

    }

    onChangeHandler = (e) => {

        e.preventDefault();
    }

  render() {

    // -------------------state------------------
    const {loading,searchBookObj} = this.props.book;  // redux bookReducer 
    //--------------------------------------------

    return (
      <div>
        <Form>
        <Dropdown search fluid 
            placeholder="search book"
            value={this.state.query}
            onSearchChange={this.onSearchChangeHandler}
            onChange={this.onChangeHandler}
            options={searchBookObj.searchDropdownOptions}
            loading={loading}
             />
        </Form>
      </div>
    )
  }
}

SearchBook.propTypes={
    book: propTypes.shape({
        loading: propTypes.bool.isRequired,
        books: propTypes.array.isRequired,
        searchBookObj: propTypes.shape({
            searchDropdownOptions: propTypes.array.isRequired,
        }).isRequired,
    }).isRequired,
    searchBook: propTypes.func.isRequired
}

function  mapStateToProps(state){

    return {
        book: state.book
    }
}


export default connect(mapStateToProps,{searchBook})(SearchBook);
