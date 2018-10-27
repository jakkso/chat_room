import DateTime from 'luxon';
import React from 'react';


function Message(props) {
  function createTimestamp() {
    const ts = DateTime.fromMillis(timestamp);
    return ts.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  }
  const {username, timestamp, messageID, payload} = props;
  const str_timestamp = createTimestamp();
  return (
    <div className="message" id={messageID}>
      <span className="username">{username}</span>
      <span className="timestamp">{str_timestamp}</span>
      <span className="messageText">{payload}</span>
    </div>
  )
}

export default Message;