import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = (props) => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const [headerTitle, setHeaderTitle] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:8001/api/book/get/${id}`)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setHeaderTitle(res.data.title);
            })
            .catch((err) => console.log(err));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8001/api/book/update/${id}`, {
                title,
                description,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <header>Edit {headerTitle}</header>

            <form onSubmit={submitHandler}>
                <div className="form-fields">
                    <label>Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        name="title"
                        type="text"
                    />
                </div>

                <br />

                <div className="form-fields">
                    <label>Description</label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        type="text"
                    />
                </div>

                <br />
                {}
                <input class="submit-input" type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateBook;