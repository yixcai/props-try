import React, {useState, useEffect} from 'react'

import {Row, Button} from 'antd'

import OrderList  from '../components/OrderList';
import Header from '../components/vendorHeader';

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
            <div style = {{marginLeft:'3vw', alignItems:'center'}}>
                <Row gutter={6}>
                    <Button onClick={()=> setStatus('&status=outstanding')}>Outstanding</Button>
                    <Button onClick={()=> setStatus('&status=fulfilled')} style={{marginLeft:'1vw'}}>Fulfilled</Button>
                    <Button onClick={()=> setStatus('&status=completed')} style={{marginLeft:'1vw'}}>Completed</Button>
                    <Button onClick={()=> setStatus('&status=cancelled')} style={{marginLeft:'1vw'}}>Cancelled</Button>
                </Row>

            </div>
            <OrderList id={props.location.state.vendor.id} target={target} status = {status} />
        </div>
    )
}
