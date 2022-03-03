import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../../redux/actionCreators';
import Spinner from '../../Spinner/Spinner';
import Order from './Order/Order';

const mapSatateToProps=state=>{
    return{
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderError: state.orderError,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        fetchOrders: (token, userId)=> dispatch(fetchOrders(token, userId))
    }
}

class Orders extends Component{

    componentDidMount(){
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render(){

        let orders=null;

        if(this.props.orderError){
            orders=<p style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "10px",
                marginLeft: "10px"
            }}>Failed the orders load</p>

        } else{
            if(this.props.orders.lenght===0){
                orders=<p style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "10px",
                    marginLeft: "10px"
                }}>You have No Orders</p>

            } else{
                orders = this.props.orders.map((order)=>{
                    return (<Order order={order} key={order.id}/>)
                })
            }
            
        }

        return(
            <div>
               {this.props.orderLoading? <Spinner/>: orders}
            </div>
        );
    }
    
}

export default connect(mapSatateToProps, mapDispatchToProps)(Orders);