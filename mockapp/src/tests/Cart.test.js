import React from 'react'
import Context from '../Context'
import Cart from '../components/Cart'

import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'


const context = {
    cart: {
        "pot-A": { id: "pot-A", amount: 1, 
            product: { price: 49}
        },
        "pot-B": { id: "pot-B", amount: 2,
            product: { price: 69}
        }
    }
}

jest.mock("../components/CartItem", () => {
    return function CartItem(item) {
        return(
            <div data-testid="cart-item">
                {item.name}
            </div>
        )
    }
})

test('show items in cart', () => {
    render(
        <Context.Provider value={context}>
            <Cart />
        </Context.Provider>
    )

    const cartItemEl = screen.getAllByTestId('cart-item')
    expect(cartItemEl.length).not.toBe(0)
})

test('no item in cart', () => {
    const context = { cart: {}}
    render(
        <Context.Provider value={context}>
            <Cart />
        </Context.Provider>
    )

    const msgEl = screen.getByText(/No item in cart!/i)
    expect(msgEl).toBeInTheDocument()
})

test('total sum function', () => {
    render(
        <Context.Provider value={context}>
            <Cart />
        </Context.Provider>
    )

    const total = Object.values(context.cart).reduce((total, item) => total + item.product.price*item.amount, 0)
    const showTotalEl = screen.getByText(/Total:/i)
    expect(showTotalEl).toHaveTextContent("Total: " + total)
})


test('clear cart function', () => {
    const clearCart = jest.fn().mockImplementation(()=>{
        console.log("cleared??")
        const context = {cart: {}}
        return(
            render(
                <Context.Provider value={context} >
                    <Cart />
                </Context.Provider>
            )
        )
    })

    const context = {
        cart: {
            "pot-A": { id: "pot-A", amount: 1, 
                product: { price: 49}
            },
            "pot-B": { id: "pot-B", amount: 2,
                product: { price: 69}
            }
        }, clearCart}

    render(
        <Context.Provider value={context} >
            <Cart />
        </Context.Provider>
    )

    const clearCartEl = screen.getByText(/Clear cart/i)
    fireEvent.click(clearCartEl)
    expect(screen.getByText(/No item in cart!/i)).toBeInTheDocument()
})