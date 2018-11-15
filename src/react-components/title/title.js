import React from 'react';
import './title.css'

export function Title(props) {
  const {text} = props;
  return(
    <div className={"title"}>
      {text}
    </div>
  )
}