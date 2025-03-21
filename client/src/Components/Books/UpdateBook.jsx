import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';

const UpdateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/books/${id}`);
                setTitle(response.data.title);
                setAuthor(response.data.author);
            } catch (err) {
                console.error("Error fetching book data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.put(`http://localhost:3001/books/${id}`, { title, author });
            navigate("/books");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update book. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-vh-100 bg-light d-flex flex-column">
            {/* Header */}
            <div className="bg-primary text-white p-4 shadow-sm">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <button 
                            onClick={() => navigate("/books")}
                            className="btn btn-outline-light btn-sm me-3"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                            Back
                        </button>
                        <h1 className="mb-0">
                            <FontAwesomeIcon icon={faBook} className="me-2" />
                            Update Book
                        </h1>
                    </div>
                </div>
            </div>
            {/* Form */}
            <div className="container py-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="author" 
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)} 
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="me-2" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateBook;