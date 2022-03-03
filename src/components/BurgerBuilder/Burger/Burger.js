import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css';


const Burger=(props)=>{

  let ingredientArr=props.ingredients.map(item=>{
    let ammountArr = [...Array(item.amount).keys()]
  
    return ammountArr.map(_ =>{
      return <Ingredient key={Math.random()} type={item.type} />
    })

  })
  .reduce((arr, element)=>{
    return arr.concat(element);
  }, []);

  
  if (ingredientArr.length===0){
    ingredientArr=<p>Please add some ingredients</p>
  }


  console.log(ingredientArr);
  return (
    <div className="Burger">
        <Ingredient type="top"/>
        {ingredientArr}
        <Ingredient type="bottom"/>
    </div>
  )
}

export default Burger;

