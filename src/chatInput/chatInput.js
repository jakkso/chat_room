import React from 'react';

/**
 * SFC to render the chat input box
 * @param props
 */
function Input(props) {
  const {onChange, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onChange}
        placeholder="Type yer message"
      />
      <input
        type="submit"
        value="Send"
        onSubmit={onSubmit}
      />
    </form>
  )

}


export default Input;