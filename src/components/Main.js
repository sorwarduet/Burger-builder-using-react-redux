import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { authCheck } from "../redux/actionAuthCreator";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./BurgerBuilder/Orders/Checkout/Checkout";
import Orders from "./BurgerBuilder/Orders/Orders";
import Header from "./Header/Header";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps=()=>dispatch =>{
 return{
  authCheck: ()=> dispatch(authCheck())
 }
}

class Main extends Component {
  componentDidMount(){
    this.props.authCheck();
  }
  render(){
    let routes = null;

  if (this.props.token === null) {
    routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Header />
      <div className="container">{routes}</div>
    </div>
  );

  }
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
