import React, { Component } from 'react';
import './App.css';

import {Message} from './messageWindow/singleMessage';
import {Main} from "./main/main";


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

    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a est quis leo tempor tincidunt et a metus. Cras vel odio ante. Proin quis tempus mauris, vel laoreet eros. Suspendisse condimentum porttitor velit, non hendrerit tellus pellentesque in. Quisque bibendum non ante ut ornare. Proin semper sollicitudin maximus. Nulla gravida, ipsum eget vestibulum posuere, nunc nunc vehicula sem, et sodales ex purus sit amet turpis.\n' +
      '\n' +
      'Ut vehicula nunc quam, at ullamcorper mauris porta nec. Nullam vulputate ac neque ac ultrices. Donec condimentum lobortis diam, sed dignissim est. Aenean ligula ipsum, iaculis placerat arcu eget, tempor tempus lorem. Aenean eget augue sed magna faucibus tempor eget ut lorem. Proin viverra erat nec massa luctus blandit. Proin vitae condimentum nibh. Proin enim arcu, consequat ut ultrices at, fringilla sed massa. Vivamus et nulla dapibus, blandit diam sed, pretium dui. Quisque non purus elementum, mollis libero in, accumsan risus. Aliquam accumsan lorem magna, ac luctus urna porttitor et. Donec purus nunc, aliquet eu sagittis vitae, pulvinar in magna.\n' +
      '\n' +
      'Fusce viverra nisi mi, a pulvinar ligula vehicula a. In hac habitasse platea dictumst. Cras venenatis, justo eu ullamcorper vehicula, libero lacus vestibulum diam, nec rutrum nunc lacus lacinia purus. Maecenas nec odio a dolor maximus molestie ut nec quam. Nunc a est congue tellus mollis dapibus. Duis nec neque pretium, convallis nunc sit amet, egestas lectus. Nunc id dui sed arcu rutrum placerat. In interdum est quis rhoncus vulputate. Proin tristique lectus justo, nec aliquet libero consectetur sed. Fusce vel dui ac orci sollicitudin pharetra. Aenean lectus turpis, eleifend a nulla ut, dapibus viverra mi. Sed nec enim a orci bibendum hendrerit.\n' +
      '\n' +
      'Donec enim lectus, mollis sodales nunc vel, pulvinar aliquam lorem. Praesent sit amet sodales ex. Quisque libero lorem, ultrices a leo vel, vulputate sodales sapien. Cras viverra mattis feugiat. Curabitur ullamcorper pulvinar nulla consectetur tempus. Etiam consectetur ex sodales magna lacinia, nec ornare arcu fringilla. Nullam ac risus elit.\n' +
      '\n' +
      'Suspendisse magna magna, ultrices quis lobortis id, ullamcorper id massa. Curabitur vehicula blandit convallis. Ut ut est tempor, fermentum sapien non, eleifend ligula. Quisque maximus nibh ante, in fermentum felis rutrum quis. Sed eleifend finibus nunc, non iaculis nulla auctor vel. Suspendisse in semper nulla, eget elementum odio. Duis dapibus posuere felis a imperdiet. Praesent egestas posuere facilisis. Aenean cursus tortor id arcu rhoncus, non ullamcorper felis consequat. Nam non iaculis risus, sed malesuada purus. In sed justo mauris. Ut mauris dolor, maximus et ex sed, dictum scelerisque dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec nec tempus turpis. Integer bibendum nisi neque, quis tempor elit ultricies at. Donec scelerisque condimentum nunc eget lobortis.' +
      '';

    const msg = {
      username:"John Smith",
      timestamp: 1540605398000,
      messageID:"12345",
      payload:"Hello my name is john.",
    };

    const status = {
      username: "statusMessage",
      timestamp: 1540605398000,
      payload: 'Jack Joined the channel',
      statusMessage: true,
    };

    const longMsg = {
      username: 'Jackie Mason',
      timestamp: 1540605398000,
      messageID: 1001,
      payload: longText,
    };

    return (
      <div className="App">
        <Message message={msg} lastUsername={'Jonathon'}/>
        <Message message={msg} lastUsername={'John Smith'}/>
        <Message message={msg} lastUsername={'John Smith'}/>
        <Message message={status}/>
        <Message message={longMsg} />
        <Main />
      </div>
    );
  }
}

export default App;
