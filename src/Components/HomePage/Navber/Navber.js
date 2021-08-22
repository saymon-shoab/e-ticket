import React, { useContext } from 'react';
import './Navber.css'
import logo from './../../../image/ticket.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
const Navber = () => {
  const {loggedInUser} = useContext(UserContext)
    return (
        <div>
<nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
   <div className="container-fluid me-5">
    <Link className="ms-5 navbar-brand " to="/"><img style={{width:'50px'}} src={logo} alt=""/> <i className="fw-bold">E-TICKET</i> </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link " to="/"> <span className="nav-text">Home</span> </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/destination"><span className="nav-text">Destination</span></Link>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link " to="/login"><span className="nav-text">LogIn</span></Link>
      </li>
       <li className="nav-item">
       {/* <Link style={{ fontWeight: "700", color: "white" }}>{loggedInUser.name}</Link> */}
       <p className="nav-item nav-text"  style={{ marginTop:'9px',fontWeight: "700",color: "white" }}>{loggedInUser.name}</p>
       </li>
      </ul>
    </div>
  </div>
</nav>
</div>
    );
};

export default Navber;