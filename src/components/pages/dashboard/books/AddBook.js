import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import { Segment,Form,Button,Image,Grid, GridRow, GridColumn } from 'semantic-ui-react';

import {addBook} from '../../../../actions/Books';


class AddBook extends Component {

    state={
        data:{
            goodreadsId:'',
            title:'',
            author:'',
            covers:'',
            pages:''
        }
    }

    componentDidMount(){

        this.selectedBookData();

    }

  onSubmitHandler = (e) => {

    e.preventDefault();
    // data from booksApi. no need validation on front-end. inputs are readonly. user can`t change
    this.props.addBook(this.state.data);

  }

  selectedBookData = () => {
    // selected book in array
    if(!this.props.book.books[0]) return;

    const book = this.props.book.books[0];

    this.setState({
        data:{
            ...this.state.data,
            goodreadsId: book.goodreadsId,
            title: book.title,
            author: book.author,
            covers: book.covers,
            pages: book.pages
        }
        
    });

  }


    bookCoversList = () => {

        const covers = this.state.data.covers;

        if(!covers || covers.length < 1) return;

        const bookCovers = covers.map((cover,index)=>
            <Image key={index} size="small" src={cover} />
        );

        return bookCovers;
    }



  render() {

    // ---------------------state variables-------------------------------
    const {data} = this.state;
    const {loading} = this.props.book; // redux: book reducer
    // -------------------------------------------------------------------

    const covers = this.bookCoversList();

    

    const content = 
        <Segment>
            
        <Form onSubmit={this.onSubmitHandler} loading={loading} >

            <Grid columns={2} stackable>

                <GridRow>
                    <GridColumn>
                        <Form.Field>
                            <label htmlFor="title">title</label>
                            <input 
                                type="text"
                                id="title"
                                name="title"
                                value={data.title}
                                readOnly
                            />
                        </Form.Field>

                        <Form.Field>
                            <label htmlFor="author">author</label>
                            <input 
                                type="text"
                                id="=author"
                                name="author"
                                value={data.author}
                                readOnly
                            />
                        </Form.Field>

                        <Form.Field>
                            <label htmlFor="pages">pages</label>
                            <input 
                                type="text"
                                id="pages"
                                name="pages"
                                value={data.pages}
                                readOnly
                            />
                        </Form.Field>
                    </GridColumn>
                                
                    <GridColumn>

                        {covers}
                    </GridColumn>

                </GridRow>

                <GridRow>
                    <Button primary disabled={loading}>save</Button>
                </GridRow>

            </Grid>

        </Form>

        </Segment>

    return (
      <div>

        {content}

      </div>
    )
  }
}


AddBook.propTypes = {

  book: propTypes.shape({

      loading: propTypes.bool.isRequired,
      books: propTypes.array.isRequired,

  }).isRequired,
  addBook: propTypes.func.isRequired,
}


function mapStateToProps(state){

  return {
      book: state.book
  }
}


export default connect(mapStateToProps,{addBook})(AddBook);