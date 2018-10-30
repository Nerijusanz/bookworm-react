import React, { Component } from 'react'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import { Form,Dropdown } from 'semantic-ui-react';

import {searchBook} from '../../../../actions/Books';

class SearchBook extends Component {

    state={
        query:'',
        options:[
            {key:1,value:1,text:"first"},
            {key:2,value:2,text:'second'}
        ]

        

    }

    onSearchChangeHandler = (e) => {

        e.preventDefault();

        clearTimeout(this.timer);

        const queryVal = e.target.value;

        this.timer = setTimeout(()=>{
            // note: do axios query to server after 1s, when stop search typing!!!
            this.setState({query:queryVal});
            this.props.searchBook(queryVal)

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
            options={searchBookObj.options}
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
            options: propTypes.array.isRequired,
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
