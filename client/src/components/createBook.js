import React, { useState } from "react";
import axios from "axios";

const CreateBook = (props) => {
  const { bookList, setBookList } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(userId);
    axios
      .post("http://localhost:8001/api/book/add", {
        title,
        description,
        // fans: [userId],
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200 && res.data) {
          setBookList([...bookList, res.data]);
        }
        setTitle("");
        setDescription("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-fields">
          <label>Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            type="text"
            required={true}
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
            required={true}
            minLength={5}
          />
        </div>
        <br />
        {}
        <input className="submit-input" type="submit" value="Create" />
      </form>
    </div>
  );
};
export default CreateBook;
