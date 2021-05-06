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
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        customer = {props.location.state.customer}
                        />
        </>
    )
}   