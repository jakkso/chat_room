import React from 'react';

import {Message} from './singleMessage';

export function MsgWindow(props) {
  const {messages} = props;
  return (
    <div id="message-window">
      {messages.map((message, index) => {
        const lastUsername = (index > 0) ? messages[index-1].username: '';
        return <Message message={message} lastUsername={lastUsername}/>
        }
      )}
    </div>
  )
}
