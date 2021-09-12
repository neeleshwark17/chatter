import React from "react";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();

    //
    const authObject = {
      "Project-ID": "0f461819-46ed-46ce-8d12-c5927a132bae",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      await axios.get("https://api.chatengine.io/chats", { headers: authObject});
      
      //store credentials to local storage
      localStorage.setItem('username',username)
      localStorage.setItem('password',password)

      window.location.reload()

    } catch (error) {
        console.log('error->',error)
        setError('!Invalid Credentials')
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chatter</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="input"
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Password"
              required
            />
            <div align="center">
              <button type="submit" className="button">
                <span>Start Chatting</span>
              </button>
            </div>
            <h2 align="center" style={{color:'red'}} className='error'>{error}</h2>
          </form>
      </div>
    </div>
  );
}
