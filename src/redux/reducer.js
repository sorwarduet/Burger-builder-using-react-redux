import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICE = {
  cheese: 20,
  lettuse: 30,
  meat: 10,
  tomato: 15,
};

const INITE_SATATE = {
  ingredients: [
    { type: "cheese", amount: 0 },
    { type: "lettuse", amount: 0 },
    { type: "meat", amount: 0 },
    { type: "tomato", amount: 0 },
  ],
  totalPrice: 80,
  purchesable: false,
  orders: [],
  orderLoading: true,
  orderError: false,
  token: null,
  userId: null,
  authLoading: false,
  authErrorMsg: null
};

export const reducer = (state = INITE_SATATE, action) => {
  const ingredients = [...state.ingredients];

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      for (let item of ingredients) {
        if (item.type === action.payload) {
          item.amount++;
        }
      }

      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice +INGREDIENT_PRICE[action.payload],
      };
    }
    case actionTypes.REMOVE_INGREDIENT: {
      for (let item of ingredients) {
        if (item.type === action.payload) {
          if (item.amount <= 0) return state;
          item.amount--;
        }
      }

      return{
          ...state,
          ingredients: ingredients,
          totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
      }

    }

    case actionTypes.UPDATE_PURCHASABLE:{
        const sum= state.ingredients.reduce((sum, element)=>{
            return sum+ element.amount;
            
          }, 0)

          return{
              ...state,
            purchesable: sum>0
          }
    }

    case actionTypes.RESET_INGREDIENT:{
      return{
        ...state,
        ingredients: [
          { type: "cheese", amount: 0 },
          { type: "lettuse", amount: 0 },
          { type: "meat", amount: 0 },
          { type: "tomato", amount: 0 },
        ],
        totalPrice: 80,
        purchesable: false,

      }
    }

    case actionTypes.LOAD_ORDERS:{
      let orders=[]
     for(let key in action.payload){
        orders.push({
          ...action.payload[key],
          id: key
        })
     }

      return{
        ...state,
        orders: orders,
        orderLoading: false
      }
    }

    case actionTypes.LOAD_FAIL_ORDERS:{
      return{
        ...state,
        orderError: true,
        orderLoading: false

      }
    }

    case actionTypes.AUTHT_SUCCESS: {

      return{
        ...state,
        authErrorMsg: null,
        token: action.payload.token,
        userId: action.payload.userId
      }
    }

    case actionTypes.AUTHT_LOGOUT:{
      return{
        ...state,
        authErrorMsg: null,
        token: null,
        userId: null

      }
    }
    case actionTypes.AUTHT_LOADING:{
      return{
        ...state,
        authLoading: action.payload

      }
    }

    case actionTypes.AUTHT_FAIL:{
      return{
        ...state,
        authErrorMsg: action.payload

      }
    }

    default:
      return state;
  }
};
