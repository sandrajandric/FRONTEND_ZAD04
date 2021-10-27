import React, {useState} from "react";
import { usePagedBookList, deleteBook} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';


import {useAuth} from './useAuth';

const FilterBooksPage = () => {
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


    if(loading){
        return <h3>Loading...</h3>;
    }else{
        return (<div>
            x
            {console.log(list)}
        </div>
        ) /*<div>
            
            <BookList list={lista} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            <TablePagination
                component="div"
                count={lista.length}
                page={page-1}
                onPageChange={(e, p) => goToPage(p)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                }}
                labelDisplayedRows={({from, to, count, page}) => `Prikazujem stranicu ${page+1} (${from}-${to} od ukupno ${count})`}
                labelRowsPerPage="Redova po stranici: "
            />
        </div> */
        
    }
}


export default FilterBooksPage;