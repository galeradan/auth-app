import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/"className="navbar-brand">Auth App</Link>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to="/login"className="nav-link" >Login</Link>
        </li>
        <li className="nav-item active">
          <Link to="/register"className="nav-link" >Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/logout"className="nav-link" >Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
