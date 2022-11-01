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

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(username, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          this.setState({ error: "Invalid Credentails" });
        }
      })
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-link is-small">
          <div className="hero-body container">
            <h6 className="title">Login</h6>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-desktop is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Email / Username: </label>
                <input
                  className="input"
                  type="email"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-black is-outlined is-pulled-right is-clearfix"
                >
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
