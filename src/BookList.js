import React, { useState } from "react";
import TableDropdown from "./TableDropdown";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './BookList.css';




 const BookList = ({list, onDelete}) => {
    return (<div className="booklist">
      {list.map((e) => (
            <div className="card" key={e.id}>
              <Card component="span" variant="outlined">
              <CardContent component="span">
                <h4>{e.title}</h4>
                <h5>{e.authors.toString()}</h5>
                <span className="span">
                  <Rating className="rating" value={Number(e.rating)} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                  <TableDropdown className="dropdown" text="..."
                  items={
                      [
                        {text: "Pregledaj...", link: true, path: `/book/${e.id}/view`},
                        {text: "Izmeni...", link: true, path: `/book/${e.id}/edit`},
                        {text: "Obrisi", link: false, action: () => onDelete(e.id)}
                      ]
                  }
                  />
                  </span>
              </CardContent>
              </Card>
              </div>
      ))} </div>)
} 

export default BookList;