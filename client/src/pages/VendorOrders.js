import './main.css';
import OrderList  from '../components/OrderList';
import Header from '../components/vendorHeader';

import React, {useState, useEffect} from 'react'
import {Row} from 'antd';
import {Button, ButtonGroup} from 'react-bootstrap'; 


export default function VendorOrders(props) {

    const [target, setTarget] = useState('');
    const [status, setStatus] = useState('');

    useEffect(()=>{
        if(window.location.pathname === '/orders'){
            setTarget('vendor')
        }
    }, [])


    return (
        <div>
            <Header vendor = {props.location.state.vendor} />
            <div style = {{background:'white',width:'80vw', alignItems:'center', marginLeft:'4.5%'}}>
                <Row id="options">
                    <ButtonGroup>
                        <Button variant="outline-dark" onClick={()=> setStatus('&status=outstanding')}> Outstanding</Button>
                        <Button variant="outline-dark" onClick={()=> setStatus('&status=fulfilled')}> Fulfilled</Button>
                        <Button variant="outline-dark" onClick={()=> setStatus('&status=completed')}> Completed</Button>
                        <Button variant="outline-dark" onClick={()=> setStatus('&status=cancelled')}> Cancelled</Button>
                        <Button variant="outline-dark" onClick={()=> setStatus('')}> All Orders</Button>
                    </ButtonGroup>
                </Row>
            </div>
            <div id="venderList">
                <OrderList id={props.location.state.vendor.id} target={target} status = {status} />
            </div>
        </div>
    )
}
