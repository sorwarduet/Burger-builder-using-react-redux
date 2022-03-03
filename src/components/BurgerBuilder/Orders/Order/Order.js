import React from 'react';

const Order=(props)=> {
    console.log(props);

    let summaryIngridients= props.order.ingredients.map((item)=>{
        return(
            <span style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "10px",
                marginLeft: "10px"
            }} key={item.type}>{item.amount} x <span style={{textTransform: "capitalize"}}>{item.type}</span></span>
        )
    })
  return (
    <div style={{
        border: "1px solid grey",
        boxShadow: "1px 1px #888888",
        borderRadius: "5px",
        padding: "30px",
        marginBottom: "10px"
    }} >
        <p>Order Number:{props.order.id}</p>
        <p>Order Number:{props.order.customer.deliveryAddress}</p>
        <p>Order Number:{props.order.customer.phone}</p>
        <hr />
        {summaryIngridients}
        <hr />
        <p>Total: {props.order.price}</p>

    </div>
  )
}

export default Order;