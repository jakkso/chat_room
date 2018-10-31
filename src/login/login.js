import React from 'react';

export function LoginView(props) {
  const {onChange, onSubmit, state } = props;
  const {username, password, hostname, channel} = state;
  return(
    <form>
      <input type="text" placeholder="Username" onChange={onChange} value={username} id="username"/>
      <input type="password" placeholder="Password" onChange={onChange} value={password} id="password"/>
      <input type="text" placeholder="Hostname" onChange={onChange} value={hostname} id="hostname"/>
      <input type="text" placeholder="Channel" onChange={onChange} value={channel} id="channel" />
      <button onClick={onSubmit} type="submit">Submit</button>
    </form>
  )
}