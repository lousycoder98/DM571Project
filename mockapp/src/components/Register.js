import React, { Component } from "react";
import withContext from "../withContext";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const initState = {
    email: "",
    password: "",
  };

class Register extends  Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    save = async (e) => {
        e.preventDefault();
        const {email, password} =this.state;

        if (email && password) {
            const id = Math.random();

            await axios.post(
                'http://localhost:3001/users',
                { email, password, id },
            )

            this.props.context.addUser(
                {
                    email,
                    password,
                },
                () => this.setState(initState)
            );
            
            this.setState(
                { flash: { status: 'is-success', msg: 'User created successfully' }}
            );
            
            } else{
            this.setState(
                { flash: { status: 'is-danger', msg: 'User not created successfully' }}
            );
        }
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

    render(){
        const { email, password } = this.state;

        return !this.props.context.user ? (
            <Navigate to="/" />) : (
            <>
                <div className="hero is-link is-small">
                    <div className="hero-body container">
                        <h4 className="title">Create User </h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.save}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <label className="label">Email: </label>
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Password: </label>
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            {this.state.flash && (
                                <div className={`notification ${this.state.flash.status}`}>
                                    {this.state.flash.msg}
                                </div>    
                            )}
                            <div className="field is-clearfix">
                                <button
                                    className="button is-primary is-outlined is-pulled-right"
                                    type="submit"
                                    onClick={this.save}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );

        
    }

}

export default withContext(Register);