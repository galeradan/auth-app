import React, { useEffect, useState } from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Home from './pages/Home'
import NavBar from './partials/NavBar'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

export interface User {
  name?: string
  email?: string
}

function App() {
  const API_URI = process.env.REACT_APP_API_URI
  const [user, setUser] = useState<User>({
    name: '',
    email: ''
  })

  const getUser = async() =>{
    const response = await fetch(`${API_URI}/user`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })

    const content = await response.json()
    setUser({
      name: content.name,
      email: content.email
    })
    localStorage.setItem(`isAuth`, JSON.stringify(true))
  }
      
  useEffect(()=>{
    if(localStorage.getItem("isAuth") === 'true'){
      getUser()
    }
    // eslint-disable-next-line
  },[])

  
  
  return (
    <>

      <BrowserRouter>
        <NavBar name={user.name!} setUser={setUser}/>
        <main className="container mt-3">
          <Switch>
            <Route exact path ="/home" component={() => <Home name={user.name!}/>}/>
            <Route exact path ="/login" component={() => <Login getUser={getUser}/>}/>
            <Route exact path ="/register" component={Register}/>
            <Route exact path ="/profile" component={() => <Profile user={user} getUser={getUser}/>}/>
            <Redirect from="/" to='/login'/>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
