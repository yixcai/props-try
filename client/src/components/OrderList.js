import React, {useState, useEffect} from 'react';
import axios from "../commons/axios";
import URLs from "../url";
import io from "socket.io-client";
import{Empty, message} from 'antd';
import { Component } from 'react'
import OrderBrief from './OrderBrief.js';


function Orders(props){
    const[orders, setOrders] = useState([])
    const[status, setStatus] = useState([])
    const id = props.id


    useEffect(()=>{
        if (props.status) {
            setStatus(props.status)
        }
        async function fetchData(){
            axios.get("/order?" + props.target + '=' + id + status).then(response=>{
                if(response.data.success) {
                    setOrders(response.data.allOrders)
                }else{
                    setOrders([])
                    message.info('no outstanding orders found');
                }
            }).catch(error =>{
                setOrders([]);
            })
        }
        fetchData()
    },[id, orders, props.target, props.status])

    const renderOrders = orders.map((order)=>{
        return(
            <OrderBrief
                key = {order._id}
                order = {order}/>
        )
    })

    return (
        <>
            {
                (orders.length > 0) ? renderOrders
                    : <Empty image = "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    description={<span>Currently No Orders</span>} />
            }

        </>
    )


}

export default class OrderList extends Component {
    constructor(props){
        super();
        this.state = {
            orders: [],
        }
    }

    componentDidMount(){
        const socket = io(`${URLs.socketURL}/socket`, {transports:['websocket']});

        socket.on("newOrder", (order)=> {
            console.log("insertion detected at frontend");
        this.setState({orders : [...this.state.orders, order]}); 
        });

        socket.on("updateOrder", (id)=> {
            console.log("update detected at frontend");
            console.log(id); 
        });

        socket.on("deleteOrder", (id)=> {
            console.log("delete detected at frontend");
            const updateOrders = this.state.orders.filter((order)=> {
                return order._id !== id;
            });
            this.setState({orders: updateOrders});
        });

    }
    


    render() {
        return (
            <div style= {{height: '100vh', width:'100%', margin:'auto', 'marginTop':'5%'}}>
                <Orders id={this.props.id} orders = {this.state.orders} target={this.props.target} status={this.props.status} />
            </div>
        )
    }
}



// export default function OrderList(props) {
//     //for loop
//     const renderOrders = props.orders.map((order, index) => {
//         return (
//             <OrderBrief
//                 key={order._id}
//                 order={order}/>
//         )
//     })
//     return (
//         <div>
//             {renderOrders}
//         </div>
//     )
// }