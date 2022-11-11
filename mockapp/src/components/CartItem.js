import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price*amount}</span>
            </b>
            <div>{product.shortDesc}</div>
            <div className="mt-1">
              <button className="button is-primary is-small is-rounded" onClick={() => props.handleUpdateCart(cartKey, amount-1)}>-</button>
              <small className="m-2">{`${amount} in cart`}</small>
              <button className="button is-primary is-small is-rounded" onClick={() => props.handleUpdateCart(cartKey, amount+1)}>+</button>
            </div>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}>
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;