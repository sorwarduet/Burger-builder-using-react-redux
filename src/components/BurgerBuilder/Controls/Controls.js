import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';


const controls =[
    {label: "Cheese", type: "cheese"},
    {label: "Lettuse", type: "lettuse"},
    {label: "Meat", type: "meat"},
    {label: "Tomato", type: "tomato"},
]

const BuildControl =props=>{
    return (
        <div className='d-flex'>
            <div className='mr-auto ml-5' style={{
                fontWeight: "bold",
                fontSize: "1.3rem"
            }}>{props.label}</div> 
            <button className='btn btn-danger m-1' onClick={props.remove}>Less</button>
            <button className='btn btn-info m-1' onClick={props.added}>More</button>
        </div>
    )

}

const Controls=props=>{
  return (
    <div className='container' style={{
        textAlign: 'center'
    }}>
        <Card style={{
            marginTop: "30px",
            marginBottom: "30px",
            textAlign: "center"

        }}>
            <CardHeader style={{
                backgroundColor: "#D70F64",
                color: "white"
            }}>Add Ingridents</CardHeader>

            <CardBody>
               {
                   controls.map(item=>{
                       return <BuildControl 
                       label={item.label} 
                       type={item.type}
                       added={()=>props.ingredientAdded(item.type)}
                       remove={()=>props.ingredientRemove(item.type)}
                       key={Math.random()}/>
                   })
               }
            </CardBody>
            <CardFooter>Price: <strong>{props.totalPrice}</strong>  Tk</CardFooter>
            <Button disabled={!props.purchesable} onClick={props.toggleModal} style={{
                backgroundColor: "#D70F64"}}>Order Now</Button>
        </Card>
    </div>
  )
}

export default Controls;