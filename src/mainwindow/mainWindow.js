// import DateTime from "luxon";
// import mqtt from 'mqtt';
import React from 'react';
import {ChatWindow} from "../chatWindow/chatWindow";


class MainWindow extends React.Component {

  constructor(props) {
    super(props);
    const {username, host, port, channel} = props;

    // Bind methods to instance
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateClient = this.generateClient.bind(this);
    this.statusMessage = this.statusMessage.bind(this);

    // State construction...
    this.state = {
      messages: [],
      text: '',
    };
    // and instance variables
    this.username = username;
    this.host = host;
    this.port = port;
    this.channel = channel;

    // MQTT Client construction

  }

  /**
   * mqtt client configuration
   */
  generateClient() {
    const client = mqtt.connect({host:this.host, port: this.port, protocol: 'mqtt', qos: 2});

    // Client connection method
    client.on('connect', ()=> {
      client.subscribe(this.channel, {qos: 2}, (err) => {
        if (!err) {
          console.log('Subscribed');
        }
        else {
          console.error("Subscription error");
          console.error(err.valueOf());
        }
      })
      // if (err) {
      //   console.error(err.valueOf());
      //   this.statusMessage(err.valueOf(), 'error', false);
      // } else if (!err) {
      //   client.subscribe(this.channel, {qos: 2}, (err) => {
      //     if (err) return console.error(err.valueOf());
      //     this.statusMessage(`${this.username} joined the channel`, 'join', true);
      //   });
      // }
    });

    // Subscription method.



    // Client message method
    client.on('message', (topic, message) => {
      const strMsg = message.toString();
      try {
        const message = JSON.parse(strMsg);
        this.setState((prevState) => ({
          messages: prevState.messages.concat([message]),
        }))
      }
      catch (err) {
        console.error(err.valueOf())
      }
    });

    return client;
  }


  /**
   * Store chat box text in state for use when submitted.
   * @param event
   */
  onChange(event) {
    const text = event.target.value.replace('"', '\\"');
    this.setState({text});
  }

  /**
   *
   * @param event
   */
  onSubmit(event) {
    event.preventDefault();
    const text = this.state.text;
    const username = this.username;
    if (text.length === 0) return;
    const timestamp = Math.round((new Date()).getTime());
    const message = {
      username: username,
      timestamp: timestamp,  // unix timestamp
      messageID: `${timestamp}-${username}`,
      payload: text,
    };
    this.client.publish(this.channel, {qos: 2}, JSON.stringify(message));
    this.setState({text: ''});
  };

  /**
   * TODO implement this to work properly.
   * @param text string, the actual message to be published.
   * @param type string, message type.
   *    Used by this.client.onPublish to determine which text to print
   *    to the message box.
   * @param broadcast {boolean} if false, adds message directly to state,
   *  bypassing sending messages to broker
   */
  statusMessage(text, type, broadcast) {
    const message = {};
    message.statusMessage = true;
    message.payload = text;
    message.username = this.username;
    message.type = type;
    message.timestamp = Math.round((new Date()).getTime());
    if (!broadcast) {
      this.setState((prevState) => ({
        messages: prevState.messages.concat([message]),
      }));
    } else {
      this.client.publish(this.channel, {qos: 2}, JSON.stringify(message));
    }
  }

  render() {
    const messages = this.state.messages;
    return (
      <div  id="main-window">
        <ChatWindow messages={messages} onChange={this.onChange} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}


export default MainWindow;
