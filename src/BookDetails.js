import React, { useState } from "react";
import { Formik } from 'formik'
import './BookDetails.css';
import { bookYupSchema, toStandardTime } from "./validationTools";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker'
import { useHistory } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, FormControlLabel, Table, TableBody, TableRow } from "@mui/material";
import { RadioGroup } from "@mui/material";
import Radio from '@mui/material/Radio';
import { usePagedBookList } from "./accessHooks";
import BookList from "./BookList";
import { TablePagination } from "@mui/material";

const BookDetails = ({ startingMode, book, action }) => {
    const [mode, setMode] = useState(startingMode);
    const [input, setInput] = useState('');
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
    const history = useHistory();

    let message = "";
    let inputProps = {}
    let hideID = false;
    if(mode === "view") {
        message = `Pregled ${book.title}`;
        inputProps = { readOnly: true };
    }else if(mode === "edit") {
        message = `Izmena ${book.title}`;
    }else if(mode === "create"){
        message = "Kreiranje nove knjige";
        hideID = true;
    }
    return <div className="formContent">
        <h3>{message}</h3>
        <Formik
            initialValues={book}
            validationSchema={bookYupSchema} 
            onSubmit={(values, {setSubmitting}) => {
                const rez = action(values);
                setSubmitting(false);
                history.go(-1);                
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                validateField,
                isSubmitting
            }) => (
            <form onSubmit={handleSubmit}>                
                {hideID || <TextField
                    fullWidth
                    margin="normal"
                    name="id"
                    label="Id"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.id && Boolean(errors.id)}
                    helperText={touched.id && errors.id}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />}
                <TextField
                    fullWidth
                    margin="normal"
                    name="title"
                    label="Naziv"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    variant="outlined"
                    InputProps={inputProps}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="authors"
                    label="Autori"
                    value={values.authors.join(", ")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.authors && Boolean(errors.authors)}
                    helperText={touched.authors && errors.authors}
                    variant="outlined"
                    InputProps={inputProps}
                />
                <Autocomplete
                    fullWidth
                    margin="normal"
                    name="genre"
                    label="Genre"
                    options={options}
                    isOptionEqualToValue={(o, v) => o.genre === v.genre }
                    value={values.genre}
                    onChange={(e, v) => {
                        setFieldValue("genre", v);
                        setFieldTouched("genre", true, true);
                        validateField("genre");
                    }}
                    inputValue={input}
                    onInputChange={(e, v) => {
                        setInput(v)
                    }}
                    onBlur={handleBlur}
                    renderInput={(params) => <TextField {...params}/>}
                />
                <p/>
                 <DatePicker
                    margin="normal"
                    name="publishDate"
                    label="Publish date:"
                    value={values.publishDate}
                    readOnly={inputProps.readOnly ? true : false}
                    onChange={(e) => {
                        setFieldValue("publishDate", toStandardTime(e));
                        setFieldTouched("publishDate", true, true);
                        validateField("publishDate");
                    }}
                    onBlur={handleBlur}                    
                    renderInput={(params) => <TextField {...params}/>}
                />
                <span>
                    {(touched.publishDate && Boolean(errors.birthday)) ? errors.publishDate : ""}
                </span><br/>
                <TextField
                   fullWidth
                    margin="normal"
                    name="rating"
                    label="Rating"
                    value={(values.rating)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.rating && Boolean(errors.rating)}
                    helperText={touched.rating && errors.rating}
                    variant="outlined"
                    InputProps={inputProps} 
                />
                
                 <TextField
                    fullWidth
                    input type="text" pattern="[0-9]*" 
                    margin="normal"
                    name="isbn"
                    label="ISBN"
                    value={values.isbn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.isbn && Boolean(errors.isbn)}
                    helperText={touched.isbn && errors.isbn}
                    variant="outlined"
                    InputProps={inputProps} 
                />
                 <TextField
                    fullWidth
                    margin="normal"
                    name="pages"
                    label="Number of pages"
                    value={Number(values.pages)}
                    onChange={handleChange}
                    onBlur={values.handleBlur}
                    error={touched.pages && Boolean(errors.pages)}
                    helperText={touched.pages && errors.pages}
                    variant="outlined"
                    InputProps={inputProps}
                />
                 <FormControl>
                    <RadioGroup
                    margin="normal"
                    name="available"
                    area-label="Available"
                    value={(values.available)}
                    onChange={(e, v) => {
                        setFieldValue("available", v);
                        setFieldTouched("available", true, true);
                        validateField("available");
                    }}
                    inputValue={input}
                    onBlur={handleBlur}>
                        <FormControlLabel value="true" control={<Radio/>} label="True"/>
                        <FormControlLabel value="false" control={<Radio/>} label="False"/>
                    </RadioGroup>
                    
                </FormControl>

                {
                    (mode === "view") ? "" : <Button disabled={isSubmitting} 
                        color="primary" variant="contained" fullWidth type="submit" >Snimi</Button>
                        
                }
               {
                (mode === "view") ?  
                <div>
                    {console.log(values.authors.toString())}
                     <BookList list={list.filter((n) => n.authors.toString() === values.authors.toString())}/>
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
                   : ""
                       
                }
            </form>
            )}       
        </Formik> 
 
    </div>
};

const options = ["Science Fiction", "Fantasy",  "Computing", "Mystery", "Horror"];

BookDetails.defaultProps = {
    book: { "id": null, title: "", authors: "", publishDate: "", rating: "", genre: options[0],
            isbn: "", available: true, pages: null },
    startingMode: "view"
}

export default BookDetails;
/*      */