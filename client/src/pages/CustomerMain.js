import {useState, useEffect} from 'react';
import {Divider} from 'antd';
import 'antd/dist/antd.css';
import '../pages/main.css';

import axios from "../commons/axios"
import Layout, { Footer } from 'antd/lib/layout/layout';
import Menu from '../components/Menu';
import Header from '../components/header';


export default function CustomerMain(props) { 
    const [snacks, setSnacks] = useState([]);
    
    useEffect(() => {
        axios.get('/snack').then(response => {
            setSnacks(response.data.snacks)
        })   
    },); 
    
    //front end design
    console.log(props);
    return (
        <>
            <Layout>
                <Header customer = {props.location.state.customer}
                        vendor = {props.location.state.vendor}
                        path = {props.location.pathname}/>

                <Menu snacks = {snacks} />

                <Footer>
                    <Divider orientation="center" style={{borderWidth:2, borderColor: '#593e34' }} plain>
                        <h2>Le Sillage</h2>
                    </Divider>
                </Footer>
            </Layout>
        </>
    )
}
