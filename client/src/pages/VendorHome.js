import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import {Jumbotron, Button,Form} from 'react-bootstrap';
import { message } from 'antd';

import axios from "../commons/axios"


function App2(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [password, setPassword] = useState('');
  const [userName, setName] = useState('');

  const[lat,setLat] = useState('');
  const[lng,setLng] = useState('');
  const[vendors,setVendors] = useState([]);

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
      setShow(false);
      console.log(error.response.data.error)
      message.error(error.response.data.error)
      })
  }

  const onGoback = () =>{
    props.history.push('/')
  }


  return (
    <div id="appMain" style={{ marginTop: '10%'}}>
      <Jumbotron style = {{background: "white"}}>
        <h1>
        <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
        &nbsp; For Vendor Login
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
          <Button variant="outline-dark"  onClick={onGoback}>
            Go back
          </Button>
          <Button variant="dark"  onClick={onVendorLogin}  style={{ float: "right"}}>
            Login
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default App2;