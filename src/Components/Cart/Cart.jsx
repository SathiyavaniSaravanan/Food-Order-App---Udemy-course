import { useContext, useState, Fragment } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = props => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartRemoveItemHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartAddItemHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);

    await fetch(
      "https://react-sending-http-reque-72394-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = cartCtx.items.map(item => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={cartRemoveItemHandler.bind(null, item.id)}
      onAdd={cartAddItemHandler.bind(null, item)}
    />
  ));

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckoutForm onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data.....</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the Order!!!!!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
