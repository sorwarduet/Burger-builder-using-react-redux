import React from "react";
import bottom from "../../../assets/bottom.jpg";
import cheese from "../../../assets/cheese.jpg";
import lettuse from "../../../assets/lettuse.jpg";
import meat from "../../../assets/meat.jpg";
import tomato from "../../../assets/tomato.jpg";
import top from "../../../assets/top.jpg";
import './Ingredient.css';

const Ingredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "top":
      ingredient = (
        <div>
          <img src={top} alt="top" />
        </div>
      );
      break;
    case "bottom":
      ingredient = (
        <div>
          <img src={bottom} alt="bottom" />
        </div>
      );
      break;
    case "cheese":
      ingredient = (
        <div>
          <img src={cheese} alt="cheese" />
        </div>
      );
      break;

    case "lettuse":
      ingredient = (
        <div>
          <img src={lettuse} alt="lettuse" />
        </div>
      );
      break;
    case "meat":
      ingredient = (
        <div>
          <img src={meat} alt="meat" />
        </div>
      );
      break;
    case "tomato":
      ingredient = (
        <div>
          <img src={tomato} alt="tomato" />
        </div>
      );
      break;

    default:
      ingredient = null;
  }
  return (
  <div className="Ingredient">
      {ingredient}
  </div>
  )
};

export default Ingredient;
