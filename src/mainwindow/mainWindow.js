// import DateTime from "luxon";
import mqtt from 'mqtt';
import React from 'react';


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
    this.client = this.generateClient();
  }

  /**
   *
   */
  generateClient() {
    const client = mqtt.connect({host:this.host, port: this.port, protocol: 'mqtt'});

    // Client connection method
    client.on('connect', (err)=> {
      if (err) {
        console.error(err.valueOf());
        this.statusMessage(err.valueOf(), 'error', false);
      }
    });

    client.subscribe(this.channel, (err) => {
      if (err) {
        console.error(err.valueOf());
        return;
      }
      this.statusMessage('Joined the channel', 'join', true);
    });


    // Client message method
    client.on('message', (topic, message) => {
      const strMsg = message.toString();
      try {
        const message = JSON.parse(strMsg);
        this.setState((prevState) => ({
          messages: prevState.messages.concat([message]),
          text: '',
        }))
      }
      catch (err) {
        // alert('Bad JSON');
        console.error(err.valueOf())
      }
    })
  }


  /**
   * Store chatbox text in state for use when submitted.
   * @param event
   */
  onChange(event) {
    const text = event.target.value.replace('"', '\\"');
    this.setState({text})
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
    const message = {
      username: username,
      timestamp: Math.round((new Date()).getTime()),  // unix timestamp
      messageID: "blah",  // TODO write id generation function.
      payload: text,
    };
    this.client.publish(this.channel, JSON.stringify(message));
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
    if (!broadcast) {
      this.setState((prevState) => ({
        messages: prevState.messages.concat([message]),
        text: '',
      }));
    } else {
      this.client.publish(this.channel, JSON.stringify(message));
    }

  }
}


export default MainWindow;
