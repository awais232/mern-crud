import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 p-5" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
          <h1 className="display-4 mb-3 fw-bold text-primary">Library Management System</h1>
          <p className="lead text-muted mb-4">Efficiently manage your books and users in one place</p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button 
              className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center gap-2 shadow-sm"
              onClick={() => navigate('/users')}
            >
              <i className="fas fa-users"></i>
              Manage Users
            </button>
            <button 
              className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center gap-2 shadow-sm"
              onClick={() => navigate('/books')}
            >
              <i className="fas fa-book"></i>
              Manage Books
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home