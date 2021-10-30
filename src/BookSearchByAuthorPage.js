import React, {useState} from "react";
import { deleteBook, usePagedSearchBookListByAuthor} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';
import { Button, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";

const BookSearchByAuthorPage = () => {
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
    ] = usePagedSearchBookListByAuthor(10, searchQuery);
    if(loading){
        return <CircularProgress/>;
    }else{
        return <div>
            <Box sx={{display: "flex", flexDirection:"row", padding: "10px", alignItems: "baseline"}}>
            <TextField
                    sx={{flexGrow: 1, marginLeft: "60px"}}
                    margin="normal"
                    name="searchByAuthor"
                    label="Pretraga po autoru"
                    value={query}
                    onChange={(e) => {
                        const val = e.target.value;
                        setQuery(val);
                    }}
                    variant="outlined"
                />
                <Button sx={{marginLeft: "20px"}} variant="contained" onClick={() => setSearchQuery(query)}>Pokreni pretragu</Button>
                </Box>
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

export default BookSearchByAuthorPage;