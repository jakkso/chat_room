import React from 'react';
import './errorMsg.css'

export function ErrorMessage(props) {
  const {error} = props;
  if (error.constructor === Array) {
    const errors = error.map((element) => {
      return (<li>{element}</li>)
    });
    return (
      <ul className="err err-list">
        {errors}
      </ul>
    )
  }
  else if (error.constructor === String) {
    return (
      <div className="err">{error}</div>
    )
  }
}
