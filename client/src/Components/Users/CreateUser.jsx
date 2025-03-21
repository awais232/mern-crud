import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';

const CreateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post("http://localhost:3001/users", { name, email, age, phone });
            navigate("/users");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create user. Please try again.");
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
                            onClick={() => navigate("/users")}
                            className="btn btn-outline-light btn-sm me-3"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                            Back
                        </button>
                        <h1 className="mb-0">
                            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                            Create New User
                        </h1>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <div className="mb-4">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            id="name"
                                            placeholder="Enter full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-lg" 
                                            id="email"
                                            placeholder="Enter email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input 
                                            type="number" 
                                            className="form-control form-control-lg" 
                                            id="age"
                                            placeholder="Enter age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            min="1"
                                            max="120"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control form-control-lg"
                                            id="phone"
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="d-grid">    
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} className="fa-spin me-2" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                                    Create User
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;