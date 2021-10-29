import React, {useState} from "react";
import { usePagedBookList, deleteBook, useBooks} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';

import {useAuth} from './useAuth';
import { CircularProgress } from "@mui/material";

function AuthorBooksPage ({izbor})  {
    const [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        setPageSize,
        reload
    ] = usePagedBookList(10);
    const [login] = useAuth();
    const l = useBooks();
    const lista = list.filter((book) => book.authors == izbor);

    if(loading){
        return <CircularProgress/>;
    }else{
        return <div>
            {console.log(lista)}
            <BookList list={lista} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            <TablePagination
                component="div"
                count={length}
                page={page-1}
                onPageChange={(e, p) => goToPage(p)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                }}
                labelDisplayedRows={({from, to, count, page}) => `Prikazujem stranicu ${page+1} (${from}-${to+1} od ukupno ${count})`}
                labelRowsPerPage="Kartica po stranici: "
            />
        </div>
    }
}


export default AuthorBooksPage;