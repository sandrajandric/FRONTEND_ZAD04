import React, {useState} from "react";
import { usePagedSearchBookList, usePagedSearchBookListByAuthor, deleteBook, useBooks} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';

import {useAuth} from './useAuth';
import { CircularProgress } from "@mui/material";

function AuthorBooksPage ()  {
    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    const [login] = useAuth();
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
    ] = usePagedSearchBookList(10, searchQuery);

    if(loading){
        return <CircularProgress/>;
    }else{
        return <div>
            {console.log(list.filter((n) => n.authors == "Calista Beltron"))}
            <BookList list={list} onDelete={(id) => {
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
                labelDisplayedRows={({from, to, count, page}) => `Prikazujem stranicu ${page+1} (${from}-${to} od ukupno ${count})`}
                labelRowsPerPage="Redova po stranici: "
            />
        </div>
    }
}



export default AuthorBooksPage;