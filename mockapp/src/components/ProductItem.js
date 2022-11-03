import React from "react";
import MyImage from "./60097550.webp"

const ProductItem = props => {
  const { product } = props;
  return (
    <div className=" column is-full is-narrow">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img src={MyImage} alt={product.shortDesc}/>
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-light is-clearfix">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <large>{product.stock + " Available"}</large>
            ) : (
              <large className="has-text-danger">Out Of Stock</large>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
