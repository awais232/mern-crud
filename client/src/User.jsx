import {React, useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt, faArrowLeft, faEdit, faSpinner, faPhone } from '@fortawesome/free-solid-svg-icons';

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getUser/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading user information...</p>
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
              <FontAwesomeIcon icon={faUser} className="me-2" />
              User Profile
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
                <div className="text-center mb-4">
                  <div className="position-relative mx-auto mb-3">
                    <div className="avatar-circle d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        width: "130px", 
                        height: "130px", 
                        borderRadius: "65px", 
                        background: 'grey',
                        fontSize: "3.5rem",
                        color: "#ffffff",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                      }}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  </div>
                  <h2 className="fw-bold mb-1">{user.name || "User Name"}</h2>
                  <p className="text-muted">Member since {new Date().getFullYear()}</p>
                </div>
                
                <div className="user-details bg-light rounded-3 p-4 mb-4">
                  <div className="info-item mb-4 pb-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <div className="icon-container me-3 d-flex justify-content-center align-items-center"
                        style={{
                          width: "48px", 
                          height: "48px", 
                          borderRadius: "12px", 
                          background: "rgba(0, 123, 255, 0.1)"
                        }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: "#007bff" }} className="fs-4" />
                      </div>
                      <div>
                        <p className="text-muted mb-0 small text-uppercase">Email</p>
                        <h5 className="mb-0 mt-1">{user.email || "Not provided"}</h5>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="d-flex align-items-center">
                      <div className="icon-container me-3 d-flex justify-content-center align-items-center"
                        style={{
                          width: "48px", 
                          height: "48px", 
                          borderRadius: "12px", 
                          background: "rgba(0, 123, 255, 0.1)"
                        }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "#007bff" }} className="fs-4" />
                      </div>
                      <div>
                        <p className="text-muted mb-0 small text-uppercase">Age</p>
                        <h5 className="mb-0 mt-1">{user.age || "Not provided"}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="d-flex align-items-center">
                      <div className="icon-container me-3 d-flex justify-content-center align-items-center"
                        style={{
                          width: "48px", 
                          height: "48px", 
                          borderRadius: "12px", 
                          background: "rgba(0, 123, 255, 0.1)"
                        }}>
                        <FontAwesomeIcon icon={faPhone} style={{ color: "#007bff" }} className="fs-4" />
                      </div>
                      <div>
                        <p className="text-muted mb-0 small text-uppercase">Phone</p>
                        <h5 className="mb-0 mt-1">{user.phone || "Not provided"}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <Link to={`/update/${id}`} className="btn btn-primary btn-lg">
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit Profile
                  </Link>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => navigate("/")}
                  >
                    Back to Users
                  </button>
                </div>
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
  );
} 

export default User;  