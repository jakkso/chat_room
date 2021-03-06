import React from 'react';

import {sendRequest} from "../../utilities/sendRequests";
import {credentials} from "../../utilities/validate";
import env from '../../env'
import './registrationView.css'

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pw1: '',
      pw2: '',
      msg: null,
      errMsg: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitButtonFocus = this.submitButtonFocus.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  /**
   * Updates state variables when user changes them in the registration form
   * @param event onChange event
   */
  handleChange(event) {
    event.preventDefault();
    const credential = event.target.value;
    switch(event.target.id) {
      case 'username':
        this.setState({username: credential, errMsg: null});
        break;
      case 'pw1':
        this.setState({pw1: credential, errMsg: null});
        break;
      case 'pw2':
        this.setState({pw2: credential, errMsg: null});
        break;
      default:
        break;
    }
  }

  /**
   * Validates credentials then sends post request to api to attempt to register client,
   * displays error / success messages as warranted
   * @param event {HTMLElement.onclick}
   * @return {Promise<void>}
   */
  async handleSubmit(event) {
    event.preventDefault();
    const {username, pw1, pw2} = this.state;
    const isValid = credentials(username, pw1, pw2);

    // Do credential validation prior to sending fetch request.
    // Server does the same check, to prevent sneaky clients from being sneaky
    if (!isValid.success) {
      this.setState({errMsg: isValid.message});
      return;
    }

    // Check that client is connected to internet
    if (!navigator.onLine) {
      this.setState({errMsg: 'network connection error.'});
      return;
    }

    const data = {username: username, password: pw1, password2: pw2};
    try {
      // TODO env.apiURL is the wrong way to do this, client doesn't need access to anything but the URL.
      // Presumably env.json contains secrets that the client doesn't need to know
      const resp = await sendRequest('POST', env.apiURL, data);
      const msg = await resp.json();  //  Convert Stream to json
      if (!msg.success) this.setState({errMsg: msg.message});
      else this.setState({msg: msg.message, errMsg: null});
    }
    catch (e) {
      if (e.toString() === 'TypeError: Failed to fetch') {
        this.setState({errMsg: 'connection error, please try again later.'})
      }
    }
  }

  /**
   * Called when user focuses on submit button.
   * Notifies user if their credentials will not validate prior to sending
   * the request.
   */
  submitButtonFocus() {
    const {username, pw1, pw2} = this.state;
    const isValid = credentials(username, pw1 , pw2);
    if (!isValid.success) {
      this.setState({errMsg: isValid.message})
    }
    this.setState({errMsg: null})
  }

  /**
   * Called when the close button is pressed.  Clears the state, so
   * that the input boxes and messages are cleared and not displayed.
   * This isn't called in ComponentWillUnmount because it isn't actually
   * unmounted when the close button is pressed, just not displayed.
   */
  clearState() {
    this.setState({
      username: '',
      pw1: '',
      pw2: '',
      msg: null,
      errMsg: null,
    })
  }

  render() {
    const {errMsg, msg} = this.state;
    const error = errMsg ? <div className="error">{errMsg}</div> : null;
    const success = msg ? <div className="success">{msg}</div> : null;
    const disableBtn = !!msg;
    const btnClass = msg ? 'disabled' : null;
    if (success) {
      return (
        <div>
          {success}
          {this.props.children}
        </div>
      )
    }
    return (
      <div id="register-container">
        <div id="register-form">
          <form>
            <input id="username" type="text" placeholder="Username" onChange={this.handleChange}/>
            <input id="pw1" type="password" placeholder="Password" onChange={this.handleChange}/>
            <input id="pw2" type="password" placeholder="Repeat password" onChange={this.handleChange}/>
          </form>
          <div>
            <button
              id="registration-btn"
              onClick={this.handleSubmit}
              onFocus={this.submitButtonFocus}
              disabled={disableBtn}
              className={btnClass}
            >
              Submit
            </button>
            {this.props.children}
          </div>
        </div>
        <div id="cred-rules">
          {error}
          {success}
        </div>
      </div>
    )
  }

}

export const RegistrationModal = ({handleClose, show}) => {
  const showHideClass = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClass}>
      <section className="modal-main">
        <Registration>
          <button onClick={handleClose}>Close</button>
        </Registration>
      </section>
    </div>
  )
};