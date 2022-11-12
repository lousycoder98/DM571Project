import React from 'react'
import Login from '../components/Login'
import Context from '../Context'

import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'

test('render email input', () => {
    render(<Login />);
    const emailInputEl = screen.getByRole('textbox', {type: 'email'});
    expect(emailInputEl).toBeInTheDocument();
});

test('render password input', () => {
    render(<Login />);
    const passwdInputEl = screen.getByRole('textbox', {type: 'password'});
    expect(passwdInputEl).toBeInTheDocument();
});

test('fucntion handleChange - email input should change', () => {
    render(<Login />)
    const testVal = "whoami@gmail.com";
    const emailInputEl = screen.getByRole('textbox', {type: 'email'});

    fireEvent.change(emailInputEl, {target: {value: testVal}});
    expect(emailInputEl.value).toBe(testVal);
});

test('fucntion handleChange - password input should change', () => {
    render(<Login />)
    const testVal = "whoamiPasswd";
    const passwdInputEl = screen.getByRole('textbox', {type: 'password'});

    fireEvent.change(passwdInputEl, {target: {value: testVal}});
    expect(passwdInputEl.value).toBe(testVal);
});

test('function login, trow error msg - password missing', async () => {
    render(<Login />);
    const testVal = "whoami@gmail.com";
    const errorMsg = /Fill all fields!/i;
    const emailInputEl = screen.getByRole('textbox', {type: 'email'});
    const buttonEl = screen.getByRole('button');

    fireEvent.change(emailInputEl, {target: {value: testVal}});
    fireEvent.click(buttonEl);

    const result = await screen.findByText(errorMsg);
    expect(result).toBeInTheDocument();
});

test('function login, trow error msg - email missing', async () => {
    render(<Login />);
    const testVal = "whoamipasswd";
    const errorMsg = /Fill all fields!/i;
    const passwdInputEl = screen.getByRole('textbox', {type: 'password'});
    const buttonEl = screen.getByRole('button');

    fireEvent.change(passwdInputEl, {target: {value: testVal}});
    fireEvent.click(buttonEl);

    const result = await screen.findByText(errorMsg);
    expect(result).toBeInTheDocument();
});

test('login function - incorrect combination of email and passwd', async () => {
    const login = jest.fn().mockImplementation((username, password) => {
        if(username === "customer@example.com" && password === "password")
            return true
        else    return false
    })
    render(
        <Context.Provider value={{login}} >
            <Login/>
        </Context.Provider>
    )
    const emailInputEl = screen.getByLabelText(/Email:/i);
    const passwdInputEl = screen.getByLabelText(/Password:/i);
    const buttonEl = screen.getByText(/Submit/i);

    fireEvent.change(emailInputEl, {target: {value: "customer@example.com"}});
    fireEvent.change(passwdInputEl, {target: {value: "incorrectone"}});
    fireEvent.click(buttonEl);
    
    expect(await screen.findByText(/Invalid Credentials/i)).toBeInTheDocument()
});


test("login succesfull, navigate to home page", async () => {
    const login = jest.fn().mockImplementation((username, password) => {
        if(username === "customer@example.com" && password === "password")
            return true
        else    return false
    })
    render(
        <Context.Provider value={{login}} >
            <Login/>
        </Context.Provider>
    )

    const emailInputEl = screen.getByLabelText(/Email:/i);
    const passwdInputEl = screen.getByLabelText(/Password:/i);
    const buttonEl = screen.getByText(/Submit/i);

    fireEvent.change(emailInputEl, {target: {value: "customer@example.com"}});
    fireEvent.change(passwdInputEl, {target: {value: "password"}});
    fireEvent.click(buttonEl);
    
    expect(login).toHaveBeenCalledWith(
        "customer@example.com",
        "password"
    )
});
    