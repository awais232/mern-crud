import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faEye,
  faTrash,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`http://localhost:3001/books/${id}`)
        .then((response) => {
          console.log("Updated books after deletion:", response.data);
          setBooks(response.data);
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-sm">
        <div className="container">
          <h1 className="mb-0">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            Book Management
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0">Book List</h5>
            <Link to="/books/create" className="btn btn-success btn-sm">
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Add Book
            </Link>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading books...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-0">No books found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={book._id}>
                        <td className="align-middle">{book.title}</td>
                        <td className="align-middle">{book.author}</td>
                        <td className="text-end">
                          <div className="btn-group">
                            <Link
                              to={`/books/update/${book._id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              <span className="d-none d-md-inline ms-1">
                                Edit
                              </span>
                            </Link>
                            <Link
                              to={`/books/${book._id}`}
                              className="btn btn-sm btn-outline-success"
                            >
                              <FontAwesomeIcon icon={faEye} />
                              <span className="d-none d-md-inline ms-1">
                                View
                              </span>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(book._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              <span className="d-none d-md-inline ms-1">
                                Delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="card-footer bg-white text-muted py-2">
            <small>Total books: {books.length}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
