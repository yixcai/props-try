import {useState, useEffect} from 'react';
import {Jumbotron, Button, Table, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../commons/axios"
// import { response } from 'express';
import { message, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../pages/main.css';
import Header from '../components/header';

const{Link}=Typography;

function App(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setModal('customer')
    setShow(true)
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setName] = useState('');

  const[lat,setLat] = useState('');
  const[lng,setLng] = useState('');
  const[vendors,setVendors] = useState([]);
  const[modal,setModal] = useState([]);

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
      setShow(false);
      console.log(error.response.data.error)
      message.error(error.response.data.error)
      })
  }

  const onSkip = () =>{
    props.history.push('/customer',{
      position:[lat, lng],
      vendors: vendors
    });
  }

 
  return (
    <div id="appMain" >
      <Modal show={show} onHide={handleClose} style={{ marginTop: '2vh' }} >
      </Modal>
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
            <br />
            <Button id="bigBtn" variant = "outline-dark" onClick = {onSkip}>
              Start Order
            </Button>
          </div>  
        </div>
      </Jumbotron>
    </div>
  );
}

export default App;