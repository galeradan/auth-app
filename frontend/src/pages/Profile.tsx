import { useState, SyntheticEvent } from 'react';
import { User } from '../App';


const Profile = (props: {user: User, getUser: ()=> void}) => {
  const [name, setName] = useState(props.user.name)
  const [email, setEmail] = useState(props.user.email)

  const submit = async(e: SyntheticEvent)=>{
      e.preventDefault();
      
      const response = await fetch("http://localhost:8000/api/user/update", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
        })
      })

      // TODO: CONVERT TO PROMISE
      const content = await response.json()

      if(content.hasOwnProperty('error')){
        alert(content["error"])
        console.log(content)
      }

      props.getUser()
  }

  return (
    <form className="form-update" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Profile</h1>

      <input type="text" id="name" className="form-control" placeholder="Name" required 
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input type="email" id="email" className="form-control" placeholder="Email address" required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">Update Profile</button>
    </form>
  );
}
export default Profile
