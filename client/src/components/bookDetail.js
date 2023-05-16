import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetail = (props) => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8001/api/book/get/${id}`)
            .then((res) => {
                console.log(res.data);
                setBookData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    return (
        <div className="bookData-component">
            <h2>Title: {bookData.title}</h2>
            <p>Description: {bookData.description}</p>
        </div>
    );
};

export default BookDetail;