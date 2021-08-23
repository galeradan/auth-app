import React, { SyntheticEvent } from 'react'
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState<String>('')
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')

  const submit = async(e: SyntheticEvent)=>{
      e.preventDefault();
      
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const content = await response.json()

      if(content.hasOwnProperty('error')){
        alert(content["error"]["Message"])
      }
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>

      <input type="text" id="name" className="form-control" placeholder="Name" required 
        onChange={e => setName(e.target.value)}
      />
      <input type="email" id="email" className="form-control" placeholder="Email address" required
        onChange={e => setEmail(e.target.value)}
      />
      <input type="password" id="password" className="form-control" placeholder="Password" required
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  );
}
export default Register
