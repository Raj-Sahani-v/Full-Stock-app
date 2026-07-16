import { Link } from "react-router"


export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
  <div className="container-fluid  ">

    
    <Link className="navbar-brand d-flex align-items-center ps-lg-5 " to="/">
      <img src="images/newlogo.jpeg" alt="brand logo" style={{width:"auto",height:"40px"}} class="me-2"/>
    </Link>

    <button className="navbar-toggler  " type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse pe-lg-5" id="navbarSupportedContent">
      <ul className
      ="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className
        ="nav-link active" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link class="nav-link active " to="about">About</Link>
        </li>
        <li className
        ="nav-item">
          <Link className="nav-link active" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active " to="pricing">Pricing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="support">Support</Link>
        </li>
      </ul>
    </div>

  </div>
</nav>
  )
} 
