import { useState, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [redirect, setRedirect] = useState<Boolean>(false)


  const submit = async(e: SyntheticEvent)=>{
    e.preventDefault();
    
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => {
      if(response.ok){
        setRedirect(true)
      }else{
        console.log(response)
      }
    }).catch(error =>{
      console.log("err:", error)
    })
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
