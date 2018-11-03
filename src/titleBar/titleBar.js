import React from 'react';
import './titleBar.css'

export function TitleBar(props) {
  const {text} = props;
  return(
    <div className={"title-bar"}>
      {text}
    </div>
  )
}