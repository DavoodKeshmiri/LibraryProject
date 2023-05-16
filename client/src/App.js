import "./App.css";
import Main from "./views/Main";
import BookDetail from "./components/bookDetail";
import UpdateBook from "./components/updateBook";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import React, { useState, useEffect } from "react";

function App() {
  const [user, setLoginUser] = useState({});

  const Logout = () => {
    localStorage.clear();
    setLoginUser(null);
    if (typeof window !== "undefined") {
      window.location.assign("/login");
    }
  };
  const setUser = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setLoginUser(user);
  };
  useEffect(() => {
    setUser();
  }, [setLoginUser]);

  return (
    <BrowserRouter>
      <div className="App">
        {user && user?._id && (
          <>
            <header>
              Welcome {user?.first_name} {user?.last_name}
            </header>
            <button onClick={() => Logout()}>logout</button>
            <hr></hr>
          </>
        )}
        <br></br>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/book/edit/:id" element={<UpdateBook />} />
          <Route path="/book/detail/:id" element={<BookDetail />} />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
