import React from 'react';

export function Get(props) {
  const {onChange, onSubmit, state } = props;
  const {username, password, hostname, port} = state;
  return(
    <form>
      <input type="text" placeholder="Username" onChange={onChange} value={username} id="username"/>
      <input type="password" placeholder="Password" onChange={onChange} value={password} id="password"/>
      <input type="text" placeholder="Hostname" onChange={onChange} value={hostname} id="hostname"/>
      <input type="number" placeholder="Port Number" onChange={onChange} value={port} id="port" />
      <button onClick={onSubmit} type="submit">Submit</button>
    </form>
  )
}
//