import React from 'react';
import { useParams } from 'react-router-dom';
import { useBook, updateBook } from './accessHooks';
import BookDetailsEdit from './BookDetailsEdit';
import { useAuth } from './useAuth';
import { CircularProgress } from '@mui/material';


const BookDetailsEditPage = () => {
    const {cid, operation} = useParams();
    const [book, loading] = useBook(cid);
    const [login] = useAuth();

    if(loading){
        return <CircularProgress/>
    }else{
            return <BookDetailsEdit
            book={book} 
            startingMode={operation}
            action={(operation === "edit") ? (book) => updateBook(book, login) : undefined}
            />
    }
};

export default BookDetailsEditPage;