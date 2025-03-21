import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// Add FontAwesome for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faEye, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:3001/deleteUser/${id}`).then((response) => {
        console.log("Updated users after deletion:", response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
    }
  }

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-sm">
        <div className="container">
          <h1 className="mb-0">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            User Management
          </h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container py-5">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0">User List</h5>
            <Link to="/create" className="btn btn-success btn-sm">
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Add User
            </Link>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-0">No users found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Phone</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td className="align-middle">{user.name}</td>
                        <td className="align-middle">{user.email}</td>
                        <td className="align-middle">{user.age}</td>
                        <td className="align-middle">{user.phone}</td>
                        <td className="text-end">
                          <div className="btn-group">
                            <Link to={`/update/${user._id}`} className="btn btn-sm btn-outline-primary">
                              <FontAwesomeIcon icon={faEdit} />
                              <span className="d-none d-md-inline ms-1">Edit</span>
                            </Link>
                            <Link to={`/user/${user._id}`} className="btn btn-sm btn-outline-success">
                              <FontAwesomeIcon icon={faEye} />
                              <span className="d-none d-md-inline ms-1">View</span>
                            </Link>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(user._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              <span className="d-none d-md-inline ms-1">Delete</span>
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
            <small>Total users: {users.length}</small>
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

export default Users;