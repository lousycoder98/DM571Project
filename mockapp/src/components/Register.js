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
            <>
                <div className="hero is-link is-small">
                    <div className="hero-body container">
                        <h4 className="title">Create User</h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.save}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is one-third">
                            <div className="field">
                                <label className="label">Email:</label>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )

        
    }

}