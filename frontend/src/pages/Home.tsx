import Pusher from 'pusher-js';
import React, { SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';

interface Messages {
  name: string;
  message: string;
}

const Home = (props: {name: string}) => {
  const [chat, setChat] = useState('')
  const [messages, setMessages] = useState([] as any)
  const pusher = new Pusher('2f01d024dfdccd763f51', {
    cluster: 'ap1'
  });
  
  

  useEffect(()=>{
    if(props.name !== ''){
      console.log("Mounted")
      // Subscribes to channel
      const channel = pusher.subscribe('chat');
      
      // Updates messages
      channel.bind('message', (data: Messages) => {
        setMessages((prevState: Messages[])=>[...prevState, data])
      });
    }
  
    return () => {
      pusher.unsubscribe("chat");
      console.log("Unmounted")
    };

    // eslint-disable-next-line
  },[])

  const submit = async (e: SyntheticEvent) =>{
    e.preventDefault()

    if(chat === ''){
     return alert("Please enter a message")
    }

    let data = {
      "name": props.name,
      "message": chat
    }

    await fetch("http://localhost:8000/api/messages",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    
    setChat('')
  }

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
      <>
        <div className="chat-header">
          <h1>Chat now</h1>
          <p>
            {props.name ? `Hi ${capitalize(props.name)}, start chatting!` : 'Please login to start chatting'}
          </p>
        </div>
        <div className="chat-body">
        {
          props.name? 
            <>
              <div className="chat-messages list-group list-group-flush mb-2">
              {
                messages.map((record: Messages, key:any)=>{
                  return (
                    <div key={key} className={`"list-group-item py-3 lh-tight" ${record.name === props.name ? 'text-right pr-4 bg-light' : "text-left"}`}>
                        <strong>{capitalize(record.name)}</strong>
                        <p>{record.message}</p>
                    </div>
                  )
                })
              }
              </div>
              <form className="chat-input" onSubmit={submit}>
                <div className="d-flex">
                  <input type="text"  className="form-control mr-2" placeholder="Your message" value={chat} onChange={e => setChat(e.target.value)}/>
                  <button className="btn btn-primary">Send</button>
                </div>
              </form>
            </>
            : ''
          }
        </div>
      </>
  );
}
export default Home
