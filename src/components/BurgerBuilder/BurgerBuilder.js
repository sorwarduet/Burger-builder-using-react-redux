import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addIngredient, removeIngredient, updatePurchesable } from '../../redux/actionCreators';
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";

// const INGREDIENT_PRICE = {
//   cheese: 20,
//   lettuse: 30,
//   meat: 10,
//   tomato: 15,
// };

const mapSatateToProps=state=>{
  return{
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchesable: state.purchesable
  }
}

const mapDispatchToProps=dispacth =>{
  return{
    addIngredient: (igtype)=> dispacth( addIngredient(igtype)),
    removeIngredient: (igtype)=> dispacth(removeIngredient(igtype)),
    updatePurchesable: ()=> dispacth(updatePurchesable())
  }
}


class BurgerBuilder extends Component {
  // state = {
  //   ingredients: [
  //     { type: "cheese", amount: 0 },
  //     { type: "lettuse", amount: 0 },
  //     { type: "meat", amount: 0 },
  //     { type: "tomato", amount: 0 },
  //   ],
  //   totalPrice: 80,
  //   modalOpen: false,
  //   purchesable: false
  // };

  state={
    modalOpen: false,
  }

  addIngredientHandle = (type) => {
    // const ingredients = [...this.props.ingredients];
    // const newPrice = this.props.totalPrice + INGREDIENT_PRICE[type];

    // for (let item of ingredients) {
    //   if (item.type === type) {
    //     item.amount++;
    //   }
    // }

    // this.setState({
    //   ingredients: ingredients,
    //   totalPrice: newPrice,
    // });

    // this.updatePurchesable(this.props.ingredients)

    this.props.addIngredient(type)
    this.props.updatePurchesable()


  };

  removeIngredientHandle = (type) => {
    // const ingredients = [...this.props.ingredients];
    // const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

    // for (let item of ingredients) {
    //   if (item.type === type) {
    //     if (item.amount <= 0) return;
    //     item.amount--;
    //   }
    // }

    // this.setState({
    //   ingredients: ingredients,
    //   totalPrice: newPrice,
    // });

    // this.updatePurchesable(this.props.ingredients)

    this.props.removeIngredient(type);
    this.props.updatePurchesable()

  };

  toggleModal=()=>{
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

 

  // updatePurchesable=(ingredients)=>{
  //   const sum= ingredients.reduce((sum, element)=>{
  //     return sum+ element.amount;
      
  //   }, 0)

  //   this.setState({
  //     purchesable: sum>0
  //   })
  // }

  handleCheckout=()=>{
    this.props.history.push("/checkout");
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Burger ingredients={this.props.ingredients} />
          </div>
          <div className="col-md-6">
            <Controls
              ingredientAdded={this.addIngredientHandle}
              ingredientRemove={this.removeIngredientHandle}
              totalPrice={this.props.totalPrice}
              toggleModal={this.toggleModal}
              purchesable={this.props.purchesable}
            />
          </div>
        </div>

      <Modal isOpen={this.state.modalOpen}>
        <ModalHeader>Your Order Sumamry</ModalHeader>
        <ModalBody>
          <Summary ingredients={this.props.ingredients}/>
          <h5>Total Price: {this.props.totalPrice.toFixed(0)}Tk</h5>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleCheckout} style={{
                backgroundColor: "#D70F64"}}>Continue to checkout</Button>
          <Button color="primary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>

      </Modal>

      </div>
    );
  }
}

export default connect(mapSatateToProps, mapDispatchToProps) (BurgerBuilder);
