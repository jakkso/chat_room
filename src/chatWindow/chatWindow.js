import React from 'react';

import Input from '../chatInput/chatInput';
import {Message} from './singleMessage';

export function ChatWindow(props) {
  const {messages, onChange, onSubmit} = props;
  return (
    <div id="chat-window">
      <div id="message-window">
        {messages.map((message) => {
          return <Message message={message} />
          }
        )}
      </div>
      <Input onChange={onChange} onSubmit={onSubmit}/>
    </div>
  )
}
