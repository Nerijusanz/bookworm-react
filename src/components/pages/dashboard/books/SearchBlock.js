import React, { Component } from 'react'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import { Segment,Dropdown } from 'semantic-ui-react';

import {searchBook,searchBookSelected} from '../../../../actions/Books';

class SearchBlock extends Component {

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

    onChangeHandler = (e,item) => {

        e.preventDefault();

        this.setState({[item.name]:item.value});

        const selectedBookObj = this.props.book.books.filter(book=>book.goodreadsId === item.value);

        this.props.searchBookSelected(selectedBookObj);
        
    }

  render() {

    // -------------------state------------------
    const {loading,searchBookObj} = this.props.book;  // redux bookReducer 
    // --------------------------------------------

    const dropdown =
        <Dropdown search fluid selection
            placeholder="search book"
            name="query"
            value={this.state.query}
            onSearchChange={this.onSearchChangeHandler}
            onChange={this.onChangeHandler}
            options={searchBookObj.searchDropdownOptions}
            loading={loading}
        />


    return (
        <Segment>{dropdown}</Segment>
    )
  }
}

SearchBlock.propTypes={
    book: propTypes.shape({
        loading: propTypes.bool.isRequired,
        books: propTypes.array.isRequired,
        searchBookObj: propTypes.shape({
            searchDropdownOptions: propTypes.array.isRequired,
        }).isRequired,
    }).isRequired,
    searchBook: propTypes.func.isRequired,
    searchBookSelected: propTypes.func.isRequired,
}

function  mapStateToProps(state){

    return {
        book: state.book
    }
}


export default connect(mapStateToProps,{searchBook,searchBookSelected})(SearchBlock);
