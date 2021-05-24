import {useState, useEffect  } from 'react';
import {Jumbotron, Button, OverlayTrigger,Tooltip, Modal, Form,Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from '../commons/axios.js';
import { message, Typography ,Layout, Menu, } from 'antd';
import Header from '../components/header.js';

function App(props) { 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const[lat,setLat] = useState('');
    const[lng,setLng] = useState('');
    const[vendors,setVendors] = useState([]);
    const{Link}=Typography;
    
    useEffect(() =>{
      navigator.geolocation.getCurrentPosition(function (position){
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      });
      axios.get('/vendor?lat='+lat+'&lng='+lng).then(response =>{
        setVendors(response.data.vendors)
      })
    },[lat,lng])
  
    const renderTooltip = (props) => (
      <Tooltip id = 'button-tooltip' {...props}>
        feature still in progess
      </Tooltip>
    );

    const onSkip = () =>{
      props.history.push('/customer',{
        position:[lat, lng],
        vendors: vendors
      });
    }

    const onLogin = () => {
      axios.post("/customer/login", {email: email, password: password}).then(response => {
        if(response.data.success){
          //传递本页信息到下一页
          props.history.push('/customer', {
            customer : response.data.customer,
            vendors: vendors,
            position: [lat,lng]
          });
        }else{
          message.error("we dont know this account")
        }
      }).catch(error =>{
        console.log(error)
        })
    }

    
    return (
      <div style={{width: '40%', margin :'auto', marginTop: '20%'}}>
        <Modal show={show} onHide={handleClose} style={{ marginTop: '2vh' }} >
          <Modal.Header closeButton>
            <Modal.Title>Customer Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <Link onClick={onSkip}>
              Skip for now
            </Link>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
        <Jumbotron style = {{background: "white" }}>
          <h1> 
          <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
          Welcome to Le Sillage!
          </h1>
          <p>
          Tell me more about the van。
          </p>
          <p>
            <Button variant = "outline-dark" onClick = {handleShow}>Customer</Button>
            <OverlayTrigger
              placement = "right"
              delay = {{show:250, hide: 400}}
              overlay = {renderTooltip}
            >
              <Button variant = "dark" style = {{marginLeft: "1vw"}}>Vendor</Button>
  
            </OverlayTrigger>
          </p>
        </Jumbotron>
      </div>
    )
} 

export default App;