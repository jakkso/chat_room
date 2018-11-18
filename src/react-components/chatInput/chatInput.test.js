import React from 'react';
import ReactDOM from 'react-dom';
import Input from './chatInput.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Input onChange={undefined} onSubmit={undefined}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
