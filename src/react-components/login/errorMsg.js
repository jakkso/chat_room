import React from 'react';
import './errorMsg.css'

export function ErrorMessage(props) {
  const {error} = props;
  if (error.constructor === Array) {
    const errors = error.map((element) => {
      return (<li key={element}>{element}</li>)
    });
    return (
      <div id="err-container">
        <ul className="err err-list">
          {errors}
        </ul>
      </div>
    )
  }
  else if (error.constructor === String) {
    return (
      <div id="err-container">
        <div className="err">{error}</div>
      </div>
    )
  }
}
