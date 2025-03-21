import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Users from "./Components/Users/Users";
import CreateUser from "./Components/Users/CreateUser";
import UpdateUser from "./Components/Users/UpdateUser";
import User from "./Components/Users/User";
import Footer from "./Components/Footer";
import Books from "./Components/Books/Books";
import CreateBook from "./Components/Books/CreateBook";
import UpdateBook from "./Components/Books/UpdateBook";
import Book from "./Components/Books/Book";
import Home from "./Components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/update/:id" element={<UpdateUser />} />
            <Route path="/users/user/:id" element={<User />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/update/:id" element={<UpdateBook />} />
            <Route path="/books/:id" element={<Book />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
