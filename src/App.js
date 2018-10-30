import React, { Component } from 'react';
import './App.css';

import {Get} from './chatInput/getCredentials';
import {Message} from './chatWindow/singleMessage';
import {Window} from './mainwindow/mqttClient';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', hostname: '', port: '8083'};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
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
        this.setState({hostname: value,});
        break;
      case "port":
        this.setState({port: value,});
        break;
      default:
        break;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {username, password, hostname, port} = this.state;
    console.log(`Username: '${username}'`);
    console.log(`Password length: ${password.length}`);
    console.log(`Hostname: '${hostname}'`);
    console.log(`Port: '${port}'`);
    this.setState({username: '', password: '', hostname: '', port: ''});
  }

  render() {

    const msg = {
      username:"John Smith",
      timestamp: 1540605398000,
      messageID:"12345",
      payload:"Hello my name is john.",
    };

    // const status = {
    //   username: "Jack",
    //   timestamp: 1540605398000,
    //   payload: 'Joined the channel',
    //   statusMessage: true,
    // };

    const username = "xander";
    const host = 'jakk.zapto.org';
    const port = 8083;
    const channel = 'chat_test';
    // const state = this.state;
    return (
      <div className="App">
        {/*<Message*/}
          {/*message={msg}*/}
        {/*/>*/}
        {/*<Get onChange={this.onChange} onSubmit={this.onSubmit} state={state}/>*/}
        <Window username={username} host={host} port={port} channel={channel}/>
      </div>
    );
  }
}

export default App;
