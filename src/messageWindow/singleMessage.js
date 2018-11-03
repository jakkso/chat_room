import DateTime from 'luxon/src/datetime';
import React from 'react';

import './singleMessage.css';


function createTimestamp(timestamp) {
  const ts = DateTime.fromMillis(timestamp);
  return ts.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
}

/**
 * Renders a single message.
 * TODO Should be simplified
 * @param props
 * @return {*}
 * @constructor
 */
export function Message(props) {
  const {message, lastUsername} = props;
  const {username, timestamp, messageID, payload, statusMessage} = message;
  const str_timestamp = createTimestamp(timestamp);
  if (statusMessage) {
    return (
      <div className="message status-message" id={messageID}>
        <div className="info-box">
          <span className="timestamp">{str_timestamp}</span>
        </div>
        <span className="payload">{payload}</span>
      </div>
    )
  }
  if (lastUsername === username) {
    return (
      <div className="message same-user" id={messageID}>
        <div className="info-box">
          <span className="timestamp">{str_timestamp}</span>
          <span className="username">{username}</span>
        </div>
        <div className="payload">
          {payload}
        </div>
      </div>
    )
  }
  return (
    <div className="message" id={messageID}>
      <div className="info-box">
        <span className="timestamp">{str_timestamp}</span>
        <span className="username">{username}</span>
      </div>
      <div className="payload">
        {payload}
      </div>
    </div>
  )
}
