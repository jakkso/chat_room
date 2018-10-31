import React from 'react';

/**
 * SFC to render the chat input box
 * @param props
 */
function Input(props) {
  const {onChange, onSubmit, text} = props;
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onChange}
        placeholder="Type yer message"
        onSubmit={onSubmit}
        value={text}
      />
      <input
        type="submit"
        value="Submit"
        onSubmit={onSubmit}
      />
    </form>
  )

}


export default Input;