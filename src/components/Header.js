import React from 'react'

function Header() {

  const email_id=localStorage.getItem('task_email');



    
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('task_email');
    window.location.href = '/login' 
  };
 
    

  return (
    <div>
        <nav className="navbar navbar-expand-lg mb-2 navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold" href="#">
      Welcome to Dashboard 
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <a className="nav-link cp text-danger fw-bold" onClick={logout}>
            Logout
          </a>
        </li>
        
          </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header