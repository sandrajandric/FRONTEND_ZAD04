import React, {useState} from "react";
import { usePagedBookList, deleteBook} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from './useAuth';
import { CircularProgress } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Formik } from "formik";
import { bookYupSchema } from "./validationTools";
import { TextField } from "@mui/material";
import { useHistory } from "react-router";
import { Tabs, Tab, Box, Typography } from "@mui/material";


const AllBooksPage = () => {
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
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    if(loading){
        return <CircularProgress/>;
    }else{
        return <div >
            <div>
            <Box sx={{width: "100%"}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
            <Tab label="svi" {...a11yProps(0)}/>
            <Tab label="sci-fi" {...a11yProps(1)}/>
            <Tab label="fantasy" {...a11yProps(2)}/>
            <Tab label="computing" {...a11yProps(3)}/>
            <Tab label="mystery" {...a11yProps(4)}/>
            <Tab label="horror" {...a11yProps(5)}/>
        </Tabs> 
        </Box>
        <TabPanel value={value} index={0}>
            <div>
                <BookList list={list} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div>
                <BookList list={list.filter((book) => book.genre === "Science Fiction")} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <div>
                <BookList list={list.filter((book) => book.genre === "Fantasy")} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            </div>
         </TabPanel>
         <TabPanel value={value} index={3}>
            <div>
                <BookList list={list.filter((book) => book.genre === "Computing")} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            </div>
         </TabPanel>
         <TabPanel value={value} index={4}>
            <div>
                <BookList list={list.filter((book) => book.genre === "Mystery")} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            </div>
         </TabPanel>
         <TabPanel value={value} index={5}>
            <div>
                <BookList list={list.filter((book) => book.genre === "Horror")} onDelete={(id) => {
                deleteBook(id, login);
                reload();
                }}/>
            </div>
         </TabPanel>
        </Box>
            </div>
           
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

const options = ["Science Fiction", "Fantasy",  "Computing", "Mystery", "Horror"];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  

export default AllBooksPage;

