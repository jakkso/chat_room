import React from 'react';

import {Message} from './singleMessage';

export function MsgWindow(props) {
  const {messages} = props;
  return (
    <div id="message-window">
      {messages.map((message) => {
        return <Message message={message} />
        }
      )}
    </div>
  )
}
