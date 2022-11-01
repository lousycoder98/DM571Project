import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const { products } = props.context;

  return (
    <>
      <div className="hero is-link is-small">
        <div className="hero-body">
          <h6 className="title">Our Products</h6>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(ProductList);
