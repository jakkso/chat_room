import React, { Component } from 'react';
import './App.css';

import {Message} from './chatWindow/singleMessage';
import Input from './chatInput/chatInput';
import MainWindow from './mainwindow/mainWindow';

function print() {
  console.log('Fired!');
}


class App extends Component {
  render() {

    const msg = {
      username:"John Smith",
      timestamp: 1540605398000,
      messageID:"12345",
      payload:"Hello my name is john.",
    };

    const status = {
      username: "Jack",
      timestamp: 1540605398000,
      payload: 'Joined the channel',
      statusMessage: true,
    };

    const username = "Bob123";
    const host = 'localhost';
    const port = 1883;
    const channel = 'chat_test';

    return (
      <div className="App">
        <Message
          message={msg}
        />
        <Message message={status}/>
        <Input onChange={print} onSubmit={print}/>
        <MainWindow username={username} host={host} port={port} channel={channel}/>
      </div>
    );
  }
}

export default App;
