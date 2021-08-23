function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Auth App</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/user">Login</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/user">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
