import React, { Fragment } from "react";
import classes from "./Header.module.css";
import MealsImage from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";


const Header = (props) => {
    return (
      <Fragment>
        <header className={classes.header}>
          <h1>ReactMeals</h1>
          <HeaderCartButton onClickShowCart={props.onShowCart} />
        </header>
        <div className={classes["main-image"]}>
          <img src={MealsImage} alt="A table full of delicious Food!" />
        </div>
      </Fragment>
    );
}
 
export default Header;