import { useContext,useEffect,useState } from "react";
import CartContext from "../../Store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classses from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);

  const { items } = cartCtx;
  
  const noOfCartItems = items.reduce((currentNumber, item) => {
    console.log(item);
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classses.button} ${btnIsHighlighted?classses.bump:''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //If you return a function in useEffect, then it is called as an Clean Up function by React.
    return () => {
      clearTimeout(timer);
    };
    
  }, [items]);

    return (
      <button className={btnClasses} onClick={props.onClickShowCart}>
        <span className={classses.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classses.badge}>{ noOfCartItems}</span>
      </button>
    );
}
 
export default HeaderCartButton;