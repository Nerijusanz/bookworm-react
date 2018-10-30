import React, { Component } from 'react'
import propTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import {searchBook} from '../../../../actions/Books';

class SearchBook extends Component {

    state={
        query:''
    }

    onSearchChangeHandler = (e) => {
        e.preventDefault();

        clearTimeout(this.timer);

        this.setState({query:e.target.value});

        this.timer = setTimeout(this.doSearch(),1000);
    }

    onChangeHandler = (e) => {
        e.preventDefault();
    }

    doSearch = () => {

        if(!this.state.query) return;
        
        this.props.searchBook(this.state.query);

    }

  render() {
    return (
      <div>
        <Dropdown search fluid 
            placeholder="search book" 
            value={this.state.query}
            onSearchChange={this.onSearchChangeHandler}
            onChange={this.onChangeHandler}
             />

      </div>
    )
  }
}

SearchBook.propTypes={
    searchBook: propTypes.func.isRequired
}

export default SearchBook;
