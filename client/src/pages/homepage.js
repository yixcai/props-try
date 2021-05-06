import 'antd/dist/antd.css';
import '../pages/main.css';
import LeafletMap  from '../components/LeafletMap.js';
import {PageHeader,Divider, Drawer, Row, Col, Card, InputNumber,Avatar} from 'antd';
import {Component, useState, useEffect} from 'react';
import { axios } from '../commons/axios';


export default function CustomerMain(props) {
    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 

    
    
    return (
        <>
            <PageHeader title = {"Welcome, Please select the vendor"}>
            </PageHeader>
            <Drawer visible ={drawerVisible}
                closable = {true}
                onClose = {handleDrawerClose}
                width={"35%"}>
                <Divider/>

            </Drawer>

            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        customer = {props.location.state.customer}
                        state = {props.location.state}
                        his = {props.history}
                        />
        </>
    )
}