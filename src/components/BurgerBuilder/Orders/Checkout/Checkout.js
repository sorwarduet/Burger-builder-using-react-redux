import axios from "axios";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap";
import { resetIngredient } from "../../../../redux/actionCreators";
import Spinner from "../../../Spinner/Spinner";


const mapSatateToProps=state=>{
    return{
      ingredients: state.ingredients,
      totalPrice: state.totalPrice,
      purchesable: state.purchesable,
      userId: state.userId,
      token: state.token
    }
  }

const mapDispatchToProps= dispacth =>{
   return{
     resetIngredient: ()=> dispacth(resetIngredient())
   }
}

class Checkout extends Component {
  state = {
    values: {
        deliveryAddress: "",
        phone: "",
        paymentType: "",
    },
    isloading: false,
    modalOpen: false,
    modalMsg: ''
  };

  handleInputChange=(event)=>{
      this.setState({
          ...this.state.values,
          [event.target.name]: event.target.value
      })
  }

  goBack=()=>{
        this.props.history.goBack("/")
  }

  handleSubmit=()=>{
      this.setState({
          isloading: true
      })

    const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer: this.state.values,
        orderTime: new Date(),
        userId: this.props.userId
 
    }

    axios.post("https://burger-5e1af-default-rtdb.firebaseio.com/orders.json?auth="+ this.props.token, order)
    .then(res=>{
        if(res.status === 200){
           
            this.setState({
                isloading: false,
                modalOpen: true,
                modalMsg: "Order Created Succefully"
            })
            
            this.props.resetIngredient();
        }else{
            this.setState({
                isloading: false,
                modalOpen: true,
                modalMsg: "Some thing wrong Please  again order"
            })
        }
    })
    .catch(err=>{
        this.setState({
            isloading: false,
            modalOpen: true,
            modalMsg: "Some thing wrong Please  again order"
        })
    })

  }


  render() {

   let form=(
    <div>
    <h5 style={{
      border: "1px solid grey",
      boxShadow: "1px 1px #888888",
      borderRadius: "5px",
      padding: "30px"
  }}>Total: <strong>{this.props.totalPrice} </strong>Tk</h5>
  
  <Form style={{
      border: "1px solid grey",
      boxShadow: "1px 1px #888888",
      borderRadius: "5px",
      padding: "30px"
  }}>
    <FormGroup>
      <Label for="deliveryAddress">Delivery Address</Label>
      <Input
        id="deliveryAddress"
        name="deliveryAddress"
        placeholder="Enter the Address"
        type="textarea"
        value={this.state.deliveryAddress}
        onChange={(event)=> this.handleInputChange(event)}
      />
    </FormGroup>
    <FormGroup>
      <Label for="phone">Phone</Label>
      <Input
        id="phone"
        name="phone"
        placeholder="Enter the phone"
        type="text"
        value={this.state.phone}
        onChange={(event)=> this.handleInputChange(event)}
      />
    </FormGroup>

    <FormGroup>
      <Label for="paymentType">PaymentType</Label>
      <Input id="paymentType" name="paymentType" type="select"
      value={this.state.paymentType}
      onChange={(event)=> this.handleInputChange(event)}
      >
        <option value="cash">Cash On Delivery</option>
        <option value="bkash">Bkash</option> 
      </Input>
    </FormGroup>

    <Button
      className="mr-auto"
      style={{
        backgroundColor: "#D70F64",
      }}
      onClick={this.handleSubmit}
      disabled={!this.props.purchesable}
    >
      Oreder
    </Button>
    <Button className="m-2" color="primary" onClick={this.goBack}>
      Cancel
    </Button>
  </Form>
</div>
   )
    return (
        <div>
            {this.state.isloading?<Spinner/>: form}
            <Modal isOpen={this.state.modalOpen} onClick={this.goBack}>
                <ModalBody>
                    <p>{this.state.modalMsg}</p>
                </ModalBody>

            </Modal>
        </div>
      
    );
  }
}

export default connect(mapSatateToProps, mapDispatchToProps)(Checkout);
