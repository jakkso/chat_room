import React from 'react';

import './chatInput.css'

/**
 * SFC to render the chat input box
 * @param props
 */
function Input(props) {
  const {onChange, onSubmit, text, disconnect} = props;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <span>
        </span>
        <input
          type="text"
          onChange={onChange}
          onSubmit={onSubmit}
          value={text}
          id="input-box"
          placeholder="Write a message"
        />
      </form>
      <div>
        <button onClick={disconnect} id="disconnect-btn">Logout</button>
      </div>
    </div>
  )
}


export default Input;