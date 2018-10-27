import React, { Component } from 'react';
import './App.css';

import Parent from './scratch'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Parent name="Alex"/>
      </div>
    );
  }
}

export default App;
