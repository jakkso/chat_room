import React from 'react';

import './login.css';

export function LoginView(props) {
  const {onChange, onSubmit, state } = props;
  const {username, password, hostname, channel} = state;
  return(

    <div id="login-container">
      <div className="title">
        Welcome to chatRoom!
      </div>
      <form id="login-form">
        <div className="credentials">
          <input type="text" placeholder="Username" onChange={onChange} value={username} id="username"/>
          <input type="password" placeholder="Password" onChange={onChange} value={password} id="password"/>
        </div>
        <div className="server-info">
          <input type="text" placeholder="Hostname" onChange={onChange} value={hostname} id="hostname"/>
          <input type="text" placeholder="Channel" onChange={onChange} value={channel} id="channel" />
        </div>
      </form>
      <div id="button-container">
        <button id="login-button" onClick={onSubmit} type="submit">Go!</button>
      </div>
    </div>
  )
}