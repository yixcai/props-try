import {useState, useEffect} from 'react';
import {Jumbotron, Button, Table, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../commons/axios"
// import { response } from 'express';
import { message, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../pages/main.css';
import Header from '../components/header';
import {useHistory} from 'react-router-dom';

const{Link}=Typography;

function App(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  let history = useHistory();

    const onLogin = () => {
      axios.post("/customer/login", {email: email, password: password}).then(response => {
        if(response.data.success){
            history.push('/customer', {
            customer : response.data.customer,
            vendors: vendors,
            position: [lat,lng],
            password: password,
          });
          message.success("Login succsess!")
        }else{
          message.error("we dont know this account")
        }
      }).catch(error =>{
        console.log(error)
        })
    }


  const onSkip = () =>{
    props.history.push('/customer',{
      position:[lat, lng],
      vendors: vendors
    });
  }

 
  return (
    <div id="appMain" style={{width: '40%', margin :'auto'}}>
      <Jumbotron style = {{background: "white"}}>
        <div class="row"> 
          <div id="column1">
            <img alt="" src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535d808becbf7162555033_peep-102.svg" 
            width={'100%'}/>
          </div>
          <div id="column2">
            <h1>
              Welcome to Le Sillage !!
            </h1>
            <p>
              We run a fleet of food trucks that work as popup cafes 
              offering high-quality coffee and delicious snacks.
            </p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                  </Form.Text>  
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"
                  onChange={e => setPassword(e.target.value)} /> 
              </Form.Group>
              </Form>
              <br/>
            <Button variant = "outline-dark" onClick = {onLogin}>
            Login
          </Button>
          <Button variant = "outline-dark">
          register
          </Button>
          <Button id="bigBtn" variant = "outline-dark" onClick = {onSkip} size = "lg">
              Just pick a location without login first
            </Button>
          </div>  
        </div>
      </Jumbotron>
    </div>
  );
}

export default App;