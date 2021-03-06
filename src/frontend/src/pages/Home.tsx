import Pusher from 'pusher-js';
import React, { SyntheticEvent, useState } from 'react';
import { useEffect, useRef } from 'react';

interface Messages {
  name: string;
  message: string;
}

const Home = (props: {name: string}) => {
  const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY || ''
  const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER
  const API_URI = process.env.REACT_APP_API_URI  
  const [chat, setChat] = useState('')
  const [messages, setMessages] = useState([] as Messages[])
  const pusher = useRef<Pusher>();

  useEffect(()=>{
    let isMounted = true
    if(props.name !== ''){
       pusher.current = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER
      });

      // Subscribes to channel
      const channel = pusher.current.subscribe('chat');
      
      // Updates messages
      channel.bind('message', (data: Messages) => {
        if(isMounted){
          setMessages((prevState: Messages[])=>[...prevState, data])
        }
      });
    }

    return ()=>{
      pusher.current?.unsubscribe('chat')
      isMounted = false
    }
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

    await fetch(`${API_URI}/messages`,{
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
