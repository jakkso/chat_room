import React from 'react';

import DateTime from 'luxon/src/datetime';


function createTimestamp(timestamp) {
  const ts = DateTime.fromMillis(timestamp);
  return ts.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
}

export function Message(props) {
  const {message} = props;
  const {username, timestamp, messageID, payload, statusMessage} = message;
  const str_timestamp = createTimestamp(timestamp);
  if (statusMessage) {
    return (
      <div className="message" id={messageID}>
        <span>{str_timestamp}</span>
        <span>{payload}</span>
      </div>
    )
  }
  return (
    <div className="message" id={messageID}>
      <span className="username">{username}</span>
      <span className="timestamp">{str_timestamp}</span>
      <span className="messageText">{payload}</span>
    </div>
  )
}

// export default Message;
