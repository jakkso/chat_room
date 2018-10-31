import mqtt from 'mqtt';
import React from 'react';

export class Window extends React.Component {
  constructor(props) {
    super(props);
    const {username, host, port, channel} = props;
    this.username = username;
    this.channel = channel;
    this.options = {host: host, port: port, protocol: 'wss', qos: 2, clientId: username, username: username, password: '', rejectUnauthorized: false}; // Password must be typed manually in here. Ugh, TODO fix this nonsense
    this.state = {messages: [], error: null, errors: []};
  }

  componentDidMount() {
    this.client = mqtt.connect(this.options);

    this.client.on('connect', ()=> {
      console.log('Connected');
      this.client.subscribe(this.channel, {qos: 2}, (err) => {
        if (err) {
          this.client.end();
          console.error('Subscription error');
          console.error(err.valueOf());
        }
        else {
          console.log('Subscribed');
        }
      })
    });

    this.client.on('message', (topic, message) => {
      const str_msg = message.toString();  // Messages are Buffers, not strings and must be converted.

      try
      {
        const JSONMessage = JSON.parse(str_msg);
        const messages = this.state.messages;
        // this.messages.push(JSONMessage);
        console.log(`Number of valid messages: ${messages.length}`);
        console.log(JSONMessage.payload);
        // this.setState((prevState) => {
        //   prevState.messages.concat([JSONMessage])
        // })
        this.setState({messages: messages.concat([JSONMessage])});
      }
      catch (e)
      {
        console.error('JSON parse error');
        console.error(e.valueOf());
      }
    });

    this.client.on('error', (err) => {
      const errMessage = err.message;
      switch (errMessage) {
        case "Connection refused: Not authorized":
          console.log('Bad credentials'); // TODO add status message to state.messages here
          this.client.end();
          this.setState({error: errMessage});
          break;
        default:
          console.error(errMessage.message);
          this.client.end();
          break;
      }
    });

    /**
     * Called when there are errors with the stream, minimally it's called on connection errors
     * This doesn't actually catch the error, though
     * TODO find and catch the connection error that calls this func.
     */
    this.client.stream.on('error', (err) => {
      console.log(err);
      this.client.end();
    })

  }

  componentWillUnmount() {
    this.client.end();
  }

  render() {
    const messages = this.state.messages;
    return(
      <div>
        {messages.map((msg)=> {
          return(
            <div>
              {msg.payload}
            </div>
          )
        })}
      </div>
    )
  }
}

