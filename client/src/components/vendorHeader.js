import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {message} from 'antd';
import {Button, Navbar} from 'react-bootstrap';
import '../pages/main.css';

export default function Header(props) {

    let history = useHistory();

    const onLogout = () => {
        history.push('vendorHome')
        message.success("Your account has been successfully logout")
    }


    return (
        <Navbar id="nav" expand="md" >
            <Button variant="outline-light" size="" onClick = {()=>history.push('/')}>
                    <img alt="" src="/coffee-truck.png" width="70" height="50"/>
            </Button>
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
