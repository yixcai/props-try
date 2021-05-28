import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {Divider, Drawer, PageHeader} from 'antd';
import {Button} from 'react-bootstrap';
import OrderList from '../components/OrderList.js';

export default function Header(props) {

    let history = useHistory();

    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    const [target, setTarget] = useState('');



    useEffect(() => {
        if (history.location.pathname === "/customer"){
            setTitle('Welcome ' + props.customer.givenName)
            setTarget('customer');
            setOptions([<Button variant = "outline-dark" key = "0"
                onClick = {()=> {
                    history.push('/profile',{
                        customer:props.customer,
                        orders: props.orders,
                        password: props.password
                    });
                }}>Profile</Button>,
            <Button variant = "outline-dark" key = "1" onClick = {handleDrawerShow}>See Orders</Button>])
        }else if (history.location.pathname === "/profile"){
            setTitle('welcome to your profile setting')
            setOptions([
                <Button variant = "outline-primary" key = "1" onClick = {()=>history.goBack()}>Back</Button>
            ])
        }else if(history.location.pathname ==='/vendor'){
            setTitle('Welcome back ' + props.vendor.userName)
        }else{
            setTitle('Welcome to orders list')
        }
    }, []); 


    return (
        <div>
            <PageHeader title = {title}
                extra = {options}>
            </PageHeader>
            <Drawer visible ={drawerVisible}
                closable = {true}
                onClose = {handleDrawerClose}
                width={"60vw"}>
                All Orders
                <Divider/>
                <OrderList id = {props.id}
                            target = {target} 
                            orders={props.orders} 
                            />
            </Drawer>
        </div>
    )
}
