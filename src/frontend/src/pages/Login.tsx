import { useState, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';

const Login = (props: {getUser: ()=> void}) => {
  const API_URI = process.env.REACT_APP_API_URI 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)


  const submit = async(e: SyntheticEvent)=>{
    e.preventDefault();
    
    const response = await fetch(`${API_URI}/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    })

    const content = await response.json()

    if(content.hasOwnProperty('error')){
      return alert(content["error"])
    }

    setRedirect(true)
    props.getUser()
  }
  
  if(redirect){
    return <Redirect to="/home"/>
  }

  
  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      
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

export default Login;
