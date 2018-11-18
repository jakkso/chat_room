import React from 'react';

import './login.css';

/**
 * Renders the login view
 * @param props
 * @return {HTMLDivElement}
 * @constructor
 */
export function LoginView(props) {
  const {onChange, onSubmit, username, password, channel } = props;
  return(
    <div id="login-container">
      <form id="login-form">
        <input type="text" placeholder="Username" onChange={onChange} value={username} id="username" onSubmit={onSubmit}/>
        <input type="password" placeholder="Password" onChange={onChange} value={password} id="password" onSubmit={onSubmit}/>
        <input type="text" placeholder="Channel" onChange={onChange} value={channel} id="channel" onSubmit={onSubmit}/>
      </form>
        <button id="login-button" onClick={onSubmit} type="submit">Go!</button>
    </div>
  )
}
