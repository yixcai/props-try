import {useState, useEffect} from 'react';
import {Jumbotron, Button, OverlayTrigger,Tooltip, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../commons/axios"
// import { response } from 'express';
import { message, Typography } from 'antd';
import 'antd/dist/antd.css'
import e from 'cors';


const{Link}=Typography;

function App2(props) {

  const [password, setPassword] = useState('');
  const [userName, setName] = useState('');

  const[lat,setLat] = useState('');
  const[lng,setLng] = useState('');
  const[vendors,setVendors] = useState([]);

  // const renderTooltip = (props) => (
  //   <Tooltip id = 'button-tooltip' {...props}>
  //     feature still in progess
  //   </Tooltip>
  // );

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(function (position){
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    });
    axios.get('/vendor?lat='+lat+'&lng='+lng).then(response =>{
      setVendors(response.data.vendors)
    })
  },[lat,lng])

  const onVendorLogin = () => {
    console.log({userName: userName, password: password})
    axios.post("/vendor/login", {userName: userName, password: password}).then(response => {
      if(response.data.success){
        //传递本页信息到下一页
        message.success("Logged in successfully!!")
        props.history.push('/vendor', {
          vendor : response.data.vendor, 
          position: [lat,lng],
          vendors: []
        });
      }else{
        message.error(response.data.error)
      }
    }).catch(error =>{
      console.log(error.response.data.error)
      message.error("please use correct account name and password")
      })
  }


  const onCustomerRegister = () =>{
    props.history.push('/register',{
      position:[lat, lng],
      vendors: vendors
    });
  }


  return (
    <div style={{width: '40%', margin :'auto', marginTop: '10%'}}>
      <Jumbotron style = {{background: "white"}}>
        <h1>
        <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
        &nbsp; Please login your vendor account
        </h1>
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name"
              onChange={e => setName(e.target.value)} />
            <Form.Text className="text-muted">
              We promise that never sharing your details with others = )
            </Form.Text>  
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              onChange={e => setPassword(e.target.value)} /> 
          </Form.Group>
          <Button variant="dark" onClick={onVendorLogin}>
            Login
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default App2;