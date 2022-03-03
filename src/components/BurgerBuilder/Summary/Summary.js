import React from 'react';

const Summary=props=>{

    const ingredientSumamary = props.ingredients.map(item=>{
        return(
            <li>
                <span style={{
                    textTransform: "capitalize"
                }}>{item.type}</span> : {item.amount}

            </li>
        )
    })
    return(
        <div>
            <ul>
                {ingredientSumamary}
            </ul>
        </div>
    );
}

export default Summary