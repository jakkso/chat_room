import mqtt from 'mqtt';
import React from 'react';

import {validChannel} from "./utilities/validate";
import {ErrorMessage} from "./react-components/login/errorMsg";
import Input from "./react-components/chatInput/chatInput";
import {LoginView} from "./react-components/login/login";
import {RegistrationModal} from "./react-components/registration/registrationView";
import {MsgWindow} from './react-components/messageWindow/msgWindow';
import {timestamp} from "./utilities/timestamp";
import {Title} from "./react-components/title/title";


export class Main extends React.Component {
  constructor(props) {
    super(props);
    // Bind instance methods
    this.onTextChange = this.onTextChange.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.chatInputSubmit = this.chatInputSubmit.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      username: '',
      password: '',
      channel: '',
      isConnected: false,
      text: '',           // input box's state stored here.
      lastUsername: '',   // Used to group messages in MsgWindow
      messages: [],
      showRegistration: false,
      errMsg: null,
    };
    this.client = null;
    this.hostname = 'jakk.zapto.org';
    this.wssPort = 8083;
  }

  /**
   * Adds form input to state
   * @param event
   */
  onTextChange(event) {
    const value = event.target.value;
    const elementID = event.target.id;
    switch (elementID) {
      case "username":
        this.setState({username: value,});
        break;
      case "password":
        this.setState({password: value,});
        break;
      case "channel":
        this.setState({channel: value,});
        break;
      case "input-box":
        this.setState({text: value,});
        break;
      default:
        break;
    }
  }

  /**
   * Does basic validation of username, password, and validChannel,
   * return {bool} true if credentials checkout, false otherwise.
   */
  validateCredentials() {
    let returnValue = true;
    const errMsg = [];
    const {username, password, channel} = this.state;
    if (!username) {
      returnValue = false;
      errMsg.push('Blank username.');
    }
    if (!password) {
      returnValue = false;
      errMsg.push('Blank Password.');
    }

    if (!channel) {
      returnValue = false;
      errMsg.push('Enter a channel')
    }
    else if (!validChannel(channel)) {
      returnValue = false;
      errMsg.push('Channel name must not include any spaces, \'#\', or \'$\' characters.');
    }
    if (errMsg) this.setState({errMsg});
    return returnValue;
  }

  /**
   * Defines logic for handling mqtt messages.
   * In all honesty, this needs to be stripped out of this class.
   * @param event
   */
  login(event) {
    event.preventDefault();
    const {username, password, channel} = this.state;
    if (!this.validateCredentials()) return;

    const connOptions = {
      host: this.hostname,
      port: this.wssPort,
      protocol: 'wss', // websocket secure
      qos: 2,  // Messages are sent exactly once.
      username: username,
      password: password,
      rejectUnauthorized: true};
    this.client = mqtt.connect(connOptions);

    this.client.on('connect', () => {
      this.client.subscribe(channel, {qos: 2}, (err) => {
        if (err) {
          this.client.end();
          this.setState({errMsg: 'Subscription error'})
        }
        else {
          this.setState({isConnected: true});
          const joinMsg = {
            username: '',
            timestamp: timestamp(),
            payload: `${username} has joined the channel`,
            messageId: '',
          };
          this.client.publish(channel, JSON.stringify(joinMsg));
        }
      })
    });

    this.client.on('message', (channel, message) => {
      try {
        this.addMsg(JSON.parse(message.toString()), false); // message is a buffer and must be cast to string
      }
      catch (err) {
        console.error(`JSON parse error for message: ${message}`);
        console.error(err.valueOf());
      }
    });

    this.client.on('error', (err) => {
      this.client.end();
      console.error(err);
      const errMsg = err.message;
      switch (errMsg) {
        case "Connection refused: Not authorized":
          this.setState({isConnected: false, errMsg: errMsg});
          break;
        default:
          this.addMsg(errMsg, true);
          break;
      }
    });

    this.client.on('offline', ()=> {
      this.client.end();
      this.addMsg('Connection lost', true);
    });

  }

  /**
   * Disconnects from broker, clears state variables
   * @param event
   */
  logout(event) {
    event.preventDefault();
    const {username, channel} = this.state;
    const leaveMsg = {
      username: '',
      timestamp: timestamp(),
      payload: `${username} has left the channel`,
      messageId: '',
    };
    this.client.publish(channel, JSON.stringify(leaveMsg));
    this.client.end();
    this.setState({isConnected: false,
      username: '',
      password: '',
      channel: '',
      text: '',
      lastUsername: '',
      messages: [],
    })
    ;
    this.client = null;
  }

  /**
   * Adds payload to state.messages based on its type and whether or not isStatusMsg
   * is set.
   *
   * If payload is a string and isStatusMsg is set, msg obj is built then added to
   * state.messages
   *
   * If the payload is an object and isStatusMsg isn't set, then the object is added
   * to state.messages as is.

   * @param payload {String || Object}
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
          lastUsername: msg.username,
        }
      });
    }
    else if (typeof payload === "object" && payload !== null && !isStatusMsg) {
      this.setState((prevState) => {
        return {
          messages: prevState.messages.concat([payload]),
          lastUsername: payload.username,
        }
      });
    }
  }

  /**
   * This is called when the chat input box is submitted.
   * @param event
   */
  chatInputSubmit(event) {
    event.preventDefault();
    const {text, channel, username} = this.state;
    this.setState({text: ''});
    if (text.trim().length === 0) return;
    if (this.client) {
      const msg = {
        username: username,
        timestamp: timestamp(),
        payload: text,
        messageId: ''};
      this.client.publish(channel, JSON.stringify(msg));
    } else {
      this.setState({errMsg: 'Not connected to server'}); // This probably will never be called.
    }
  }

  /**
   * Used to scroll to the bottom of the list of messages upon updating.
   * This could be replaced by converting MsgWindow to a stateful component and
   * using refs, but this is simpler and easier to do.
   */
  componentDidUpdate() {
    const endOfMsgs = document.getElementById('messages-end');
    if (endOfMsgs) endOfMsgs.scrollIntoView({behavior: 'smooth'});
  }

  /**
   * Disconnect the mqtt client when the component is unmounted.
   */
  componentWillUnmount() {
    this.client.end();
  }


  toggleModal() {
    this.setState((prevState) => {
      return {
        showRegistration: !prevState.showRegistration
      }
    })
  }

  render() {
    const {username,
           password,
           messages,
           lastUsername,
           channel,
           text,
           isConnected,
           showRegistration,
           errMsg} = this.state;
    const err = errMsg ? <ErrorMessage error={errMsg}/> : null;
    let input;
    let title;

    if (isConnected) {
      title = <Title text={channel}/>;
      input = <div>
        <MsgWindow
          messages={messages}
          lastUsername={lastUsername}
        />
        <Input
          onChange={this.onTextChange}
          onSubmit={this.chatInputSubmit}
          text={text}
          disconnect={this.logout}
        />
      </div>
    }
    else {
      title = <Title text={"chatRoom"}/>;
      input = <div>
        <LoginView
          onChange={this.onTextChange}
          onSubmit={this.login}
          username={username}
          password={password}
          channel={channel}
        >
          <button type="button" onClick={this.toggleModal}>Register</button>
        </LoginView>
        <RegistrationModal handleClose={this.toggleModal} show={showRegistration}/>
      </div>
    }
    return (
      <div>
        {title}
        {input}
        {err}
      </div>
    );
  }
}
