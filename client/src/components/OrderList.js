import React from 'react' ;
import OrderBrief from "./OrderBrief.js";

export default function OrderList(props) {
    //for loop
    const renderOrders = props.orders.map((order, index) => {
        return (
            <OrderBrief
                key={order._id}
                order={order}/>
        )
    })
    return (
        <div>
            {renderOrders}
        </div>
    )
}