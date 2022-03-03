import axios from "axios";
import * as actionTypes from "./actionTypes";

export const addIngredient = (igtype) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: igtype,
  };
};

export const removeIngredient = (igtype) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: igtype,
  };
};

export const updatePurchesable = () => {
  return {
    type: actionTypes.UPDATE_PURCHASABLE,
  };
};

export const resetIngredient = () => {
  return {
    type: actionTypes.RESET_INGREDIENT,
  };
};


export const loadOrders=(orders)=>{
  return{
    type: actionTypes.LOAD_ORDERS,
    payload: orders
  }
}

export const loadFailOrders=()=>{
  return{
    type: actionTypes.LOAD_FAIL_ORDERS,
  }
}


export const fetchOrders=(token, userId)=> dispatch => {

  const query='&orderBy="userId"&equalTo="'+ userId+'"';
  
  axios.get("https://burger-5e1af-default-rtdb.firebaseio.com/orders.json?auth="+token+ query)
  .then(res=> {
    dispatch(loadOrders(res.data))
  })
  .catch(err=>{
    dispatch(loadFailOrders())
  })
}

