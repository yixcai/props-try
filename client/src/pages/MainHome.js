import {useState, useEffect  } from 'react';
import {Jumbotron, Button, OverlayTrigger,Tooltip, Modal, Form,Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from '../commons/axios.js';
import { message, Typography ,Layout, Menu, } from 'antd';
import Header from '../components/header.js';

function App(props) { 

    const onSkip = () =>{
      props.history.push('/homepage');
    }

    const onVendorHome = () =>{
      props.history.push("/vendorHome")
    }
    
    return (
      <div>
        <Jumbotron style = {{background: "white" , width: '40%', margin :'auto', marginTop: '10%'}}>
          <h1> 
          <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
          Welcome to Le Sillage!
          </h1>
          <p>
          Tell me more about the van。
          </p>
          <p>
            <Button variant = "outline-dark" onClick = {onSkip}>Customer?</Button>
            <Button variant = "outline-dark" onClick = {onVendorHome}> vendor?</Button>
          </p>
        </Jumbotron>
      </div>
    )
} 

export default App;