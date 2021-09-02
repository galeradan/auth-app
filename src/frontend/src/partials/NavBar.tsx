import React from 'react'
import {Link} from 'react-router-dom'
import { User } from '../App'

const NavBar = (props: {name:string, setUser: (user: User)=> void}) => {

  
  const logout = async ()=>{
      await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
      })

      props.setUser({
        name: ''
      })
      localStorage.setItem(`isAuth`, JSON.stringify(false))
  }

  let menu;

  if(props.name === '' || props.name === undefined){
    menu = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to="/login"className="nav-link" >Login</Link>
        </li>
        <li className="nav-item active">
          <Link to="/register"className="nav-link" >Register</Link>
        </li>
      </ul>
    )
  }else{
    menu = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/profile"className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/login"className="nav-link" onClick={logout}>Logout</Link>
        </li>
      </ul>
    )
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/home"className="navbar-brand">Auth App</Link>
      {menu}
    </nav>
  );
}

export default NavBar;
