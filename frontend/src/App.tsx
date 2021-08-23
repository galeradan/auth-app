import React from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './partials/NavBar'
import {BrowserRouter, Switch, Route} from 'react-router-dom'


function App() {
  return (
    <>

      <BrowserRouter>
        <NavBar/>
        <main className="container mt-3">
          <Switch>
            <Route exact path ="/login" component={Login}/>
            <Route exact path ="/register" component={Register}/>
            <Route exact path ="/home" component={Home}/>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
