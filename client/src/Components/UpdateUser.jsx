import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faArrowLeft, faSpinner, faSave } from '@fortawesome/free-solid-svg-icons';

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
                setPhone(response.data.phone);
            } catch (err) {
                setError("Failed to load user data. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            await axios.put(`http://localhost:3001/users/${id}`, { name, email, age, phone });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update user. Please try again.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light d-flex flex-column">
            {/* Header */}
            <div className="bg-primary text-white p-4 shadow-sm">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <button 
                            onClick={() => navigate("/")} 
                            className="btn btn-outline-light btn-sm me-3"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                            Back
                        </button>
                        <h1 className="mb-0">
                            <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                            Update User
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
                                    
                                    <div className="d-grid gap-2">  
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg"
                                            disabled={saving}
                                        >
                                            {saving ? (
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} className="fa-spin me-2" />
                                                    Saving Changes...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faSave} className="me-2" />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary btn-lg"
                                            onClick={() => navigate("/")}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="mt-auto bg-white py-3 border-top">
                <div className="container text-center text-muted">
                    <small>&copy; {new Date().getFullYear()} MERN User Management System</small>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser;