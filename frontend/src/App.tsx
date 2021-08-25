import React, { useEffect, useState } from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './partials/NavBar'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'


function App() {
  const [name, setName] = useState<string>('')

  const getUser = async() =>{
    const response = await fetch("http://localhost:8000/api/user", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })

    const content = await response.json()
    setName(content.name)
    localStorage.setItem(`isAuth`, JSON.stringify(true))
  }
      
  useEffect(()=>{
    if(localStorage.getItem("isAuth") === 'true'){
      getUser()
    }
  })

  
  
  return (
    <>

      <BrowserRouter>
        <NavBar name={name} setName={setName}/>
        <main className="container mt-3">
          <Switch>
            <Route exact path ="/home" component={() => <Home name={name}/>}/>
            <Route exact path ="/login" component={() => <Login getUser={getUser}/>}/>
            <Route exact path ="/register" component={Register}/>
            <Redirect from="/" to='/login'/>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
