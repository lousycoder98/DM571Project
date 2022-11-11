import React from 'react'
import Context from '../Context'
import ProductList from '../components/ProductList'

import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

jest.mock("../components/ProductItem", () => {
    return function ProductItem(product ) {
        return(
            <div data-testid="item-product">
                {product.name}
            </div>
        )
    }
})

test('If ProductList passed props, ProductItem component is called', () => {
    const context = {
        products: [
            {name: "mock-pan"},
            {name: "mock-pan2"}
        ]
    }
    render(
        <Context.Provider value={context}>
            <ProductList />
        /</Context.Provider>
    )

    const productItems =  screen.getAllByTestId('item-product')
    expect(productItems.length).not.toBe(0)
})

test('If ProductList passed empty props, No Products found! message is called', () => {
    render(<ProductList />)

    const noProductMsg = screen.getByText(/No products found!/i)
    expect(noProductMsg).toBeInTheDocument()
})