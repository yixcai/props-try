import React, {useState, useEffect} from 'react'
import {Row,Radio} from 'antd';
import OrderList  from '../components/OrderList';
import Header from '../components/vendorHeader';
import './main.css';
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
            <div style = {{width:'80vw', alignItems:'center'}}>
                <Row id="options">
                <Radio.Group>
                    <Radio.Button onClick={()=> setStatus('&status=outstanding')} style={{color:'black'}}> Outstanding</Radio.Button>
                    <Radio.Button onClick={()=> setStatus('&status=fulfilled')} style={{color:'black'}}> Fulfilled</Radio.Button>
                    <Radio.Button onClick={()=> setStatus('&status=completed')} style={{color:'black'}}> Completed</Radio.Button>
                    <Radio.Button onClick={()=> setStatus('&status=cancelled')} style={{color:'black'}}> Cancelled</Radio.Button>
                    <Radio.Button onClick={()=> setStatus('')} style={{color:'black'}}> All Orders</Radio.Button>
                </Radio.Group>
                </Row>

            </div>
            <OrderList id={props.location.state.vendor.id} target={target} status = {status} />
        </div>
    )
}
