import React, { useState } from "react";
import CreateBook from "../components/createBook";
import DisplayAllBook from "../components/displayAllBook";

const Main = (props) => {
    const [bookList, setBookList] = useState([]);

    return (
        <div>
            {}
            <CreateBook bookList={bookList} setBookList={setBookList} />
                        
            <DisplayAllBook
                bookList={bookList}
                setBookList={setBookList}
            />
        </div>
    );
};

export default Main;