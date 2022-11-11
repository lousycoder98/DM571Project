import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.value,
    error: "",
    loggedin: false
  });
  
  onLogin = (e) => {
    e.preventDefault();
    
    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    const loggedIn = this.props.context.login(username, password)
    if (!loggedIn) {
      this.setState({ error: "Invalid Credentials" });
    }
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-link is-small">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.onLogin}>
          <div className="columns is-desktop is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Email: 
                  <input
                    className="input"
                    type="email"
                    name="username"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className="field">
                <label className="label">Password: 
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field">
                <button className="button is-black is-outlined is-pulled-right">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
      <Navigate to="/products" />
    );
  }
}

export default withContext(Login);
