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

    
}