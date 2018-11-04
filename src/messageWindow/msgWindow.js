import React from 'react';

import './msgWindow.css'
import {Message} from './singleMsg';

/**
 * Renders all messages
 * @param props
 * @return {HTMLDivElement}
 * @constructor
 */
export function MsgWindow(props) {
  const {messages} = props;
  return (
    <div id="message-window">
      {messages.map((message, index) => {
        const lastUsername = (index > 0) ? messages[index-1].username: '';
        return <Message
          message={message}
          lastUsername={lastUsername}
          key={message.timestamp}
        />
        }
      )}
      {/* Empty div keeps track where to scroll when messages are added*/}
      <div id="messages-end" />
    </div>
  )
}
