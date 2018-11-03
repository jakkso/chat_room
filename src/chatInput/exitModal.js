import React from 'react';

import './exitModal.css'

export class ModalDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.client = props.client;
    this.state = {show: false};
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  show() {
    this.setState({show: true});
  }

  hide() {
    this.setState({show: false})
  }

  disconnect(event) {
    event.preventDefault();
    this.client.end();
  }


}

function ExitModal(props) {
  const showHideClassName = props.show ? "modal display-block": "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <button
          onClick={props.hide}
        >
          Cancel
        </button>
        <button
        onClick={props.disconnect}
        >
          Exit
        </button>
      </section>
    </div>
  )
}
