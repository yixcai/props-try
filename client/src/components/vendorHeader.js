import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {Divider, Drawer, PageHeader,message} from 'antd';
import {Button, Navbar, NavProps} from 'react-bootstrap';
import OrderList from '../components/OrderList.js';
import '../pages/main.css';

export default function Header(props) {

    let history = useHistory();

    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    const [target, setTarget] = useState('');

    const onLogout = () => {
        history.push('vendorHome')
        message.success("Your account has been successfully logout")
    }


    return (
        <Navbar id="nav" expand="md" >
            <img alt="" src="/coffee-truck.png" id="icon" className="d-inline-block align-top"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar navbar-expand-lg navbar-light bg-light">
        <nav class="navbar navbar-dark">
            <span class="navbar-brand">
                {'Welcome back, ' + props.vendor.userName +' !'}
            </span>
        </nav>
        </Navbar.Collapse>
                <Button variant="outline-light" onClick={onLogout} >Logout</Button>
        </Navbar>
    )
}
