import React from 'react';
import Login from './pages/Login'
import NavBar from './partials/NavBar'

function App() {
  return (
    <>
      <NavBar/>
      <main className="container mt-3">
        <Login/>
      </main>
    </>
  );
}

export default App;
