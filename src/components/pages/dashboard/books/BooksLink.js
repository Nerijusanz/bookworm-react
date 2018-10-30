import React from 'react';
import {Card,CardContent,CardHeader,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export const BooksLink = () => (
    <Card>
        <CardContent textAlign="center">
            <CardHeader>books</CardHeader>
            <Link to="dashboard/books"><Icon name="book" size="massive"/></Link>
        </CardContent>
    </Card>
);

export const AddBookLink = () => (
    <Card>
        <CardContent textAlign="center">
            <CardHeader>Add new book</CardHeader>
            <Link to="books/add"><Icon name="plus circle" /></Link>
        </CardContent>
    </Card>
);

