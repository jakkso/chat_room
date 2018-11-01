import mqtt from 'mqtt';
import React from 'react';

import {MsgWindow} from '../messageWindow/msgWindow';
import Input from "../chatInput/chatInput";
import {LoginView} from "../login/login";


export class Main extends React.Component {
  constructor(props) {
    super(props);
    // Bind instance methods
    this.onCredChange = this.onCredChange.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.addMsg = this.addMsg.bind(this);

    // State Construction
    this.state = {
      username: '',
      password: '',
      host: '',
      port: 8083, // Default wss port for mosquitto broker.
      channel: '',
      isConnected: false,
      text: '',
      lastUsername: '',
      messages: [],
    };
    // Instance Variables
    this.client = null;
  }

  /**
   * Stores credentials in state
   * @param event
   */
  onCredChange(event) {
    const value = event.target.value;
    const elementID = event.target.id;
    switch (elementID) {
      case "username":
        this.setState({username: value,});
        break;
      case "password":
        this.setState({password: value,});
        break;
      case "hostname":
        this.setState({host: value,});
        break;
      case "channel":
        this.setState({channel: value,});
        break;
      default:
        break;
    }
  }

  /**
   * Upon clicking login, this is called, which causes the render
   * @param event
   */
  attemptLogin(event) {
    event.preventDefault();
    const state = this.state;
    if (state.host.length === 0 || state.username.length === 0 || state.password.length === 0) {
      this.addMsg('Empty credentials or hostname', true);
      return;
    }

    const connOptions = {
      host: state.host,
      port: state.port,
      protocol: 'wss', // websocket secure
      qos: 2,
      clientId: state.username,
      username: state.username,
      password: state.password,
      rejectUnauthorized: true};
    this.client = mqtt.connect(connOptions);

    this.client.on('connect', () => {
      this.addMsg('Connected', true);
      this.client.subscribe(this.state.channel, {qos: 2}, (err) => {
        if (err) {
          this.client.end();
          this.addMsg('Subscription error', true);
        }
        else {
          this.setState({isConnected: true});
          const joinMsg = {
            username: this.state.username,
            timestamp: timestamp(),
            payload: `${this.state.username} has joined the channel`,
            messageId: '',
          };
          this.client.publish(this.state.channel, JSON.stringify(joinMsg));
        }
      })
    });

    this.client.on('message', (channel, message) => {
      try {
        this.addMsg(JSON.parse(message.toString())); // message is a buffer and must be cast to string
      }
      catch (err) {
        console.error(`JSON parse error for message: ${message}`);
        console.error(err.valueOf());
      }
    });

    this.client.on('error', (err) => {
      const errMsg = err.message;
      switch (errMsg) {
        case "Connection refused: Not authorized":
          this.client.end();
          this.addMsg(errMsg, true);
          this.setState({isConnected: false,});
          break;
        default:
          this.client.end();
          this.addMsg(errMsg, true);
          break;
      }
    })

  }

  /**
   * Adds message object to state directly, without
   * publishing it to the broker.  Used to populate the message box
   * without sending any network traffic to the broker
   * @param payload {String}
   * @param isStatusMsg {boolean}
   */
  addMsg(payload, isStatusMsg) {
    if (isStatusMsg) {
      const msg = {
        username: 'statusMessage',
        timestamp: timestamp(),
        payload: payload,
        messageId: '',
        statusMessage: true,
      };
      this.setState((prevState) => {
        return {
          messages: prevState.messages.concat([msg]),
        }
      });
    }
    else if (typeof payload === "object" && payload !== null) {
      this.setState((prevState) => {
        return {
          messages: prevState.messages.concat([payload]),
          lastUsername: payload.username,
        }
      });
    }
  }

  handleTextInput(event) {
    const text = event.target.value;
    this.setState({text});
  }

  handleTextSubmit(event) {
    event.preventDefault();
    const text = this.state.text;
    this.setState({text: ''});

    if (text.length === 0) return;

    if (this.client) {
      const msg = {
        username: this.state.username,
        timestamp: timestamp(),
        payload: text,
        messageId: ''};
      this.client.publish(this.state.channel, JSON.stringify(msg));
    } else {
      this.addMsg('Not connected to server', true);
    }
  }

  componentWillUnmount() {
    this.client.end();
  }


  render() {
    const state = this.state;
    let input;
    if (state.isConnected) {
      input = <Input
        onChange={this.handleTextInput}
        onSubmit={this.handleTextSubmit}
        text={state.text}
      />
    } else {
      input = <LoginView
        onChange={this.onCredChange}
        onSubmit={this.attemptLogin}
        state={this.state}
      />

    }
    return (
      <div>
        <MsgWindow messages={state.messages} lastUsername={state.lastUsername}/>
        {input}
      </div>
    );
  }

}

function timestamp() {
  return Math.round((new Date()).getTime())
}