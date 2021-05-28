import React from 'react';
import {Button,Navbar, Nav,Modal,Form,DropdownButton,ButtonGroup,Dropdown,OverlayTrigger,Tooltip, Container} from 'react-bootstrap';
import {useState, useEffect  } from 'react';
import {Divider, Drawer,message,Card,InputNumber,Typography} from 'antd';
import OrderList from '../components/OrderList.js';
import axios from "../commons/axios"
import {useHistory} from 'react-router-dom';
import '../pages/main.css';



function Header(props) {
    const [title, setTitle] = useState("");
    const [bottons,setBottons] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 
    const[orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[order, setOrder] = useState([]);
    const [target, setTarget] = useState('');
    const [ordershow,setOrdershow] = useState([]);
    const [givenName,setGivenName] = useState('');
    const [familyName,setFamilyName] = useState('');
    const [registerShow,setRegisterShow] = useState(false);
    const registerOpen  = () => setRegisterShow(true);
    const registerClose  = () => setRegisterShow(false);

    const renderTooltip = (props) => (
        <Tooltip id = 'button-tooltip' {...props}>
          Click here to go homepage
        </Tooltip>
      );

    let history = useHistory();
    const goHomePage = () => {history.push('/',{
        customer :props.customer
    })};

    const onLogin = () => {
        axios.post("/customer/login", {email: email, password: password}).then(response => {
          if(response.data.success){
              history.push(props.path, {
              customer : response.data.customer,
              vendors: props.vendors,
              position: props.center,
              vendor: props.vendor,
            });
            message.success("Login succsess!")
            setShow(false);
          }else{
            message.error("we dont know this account")
          }
        }).catch(error =>{
          console.log(error)
          message.error("Please enter your account")
          setShow(false);
          })
      }

    const onRegister = () => {
        axios.post('/customer/register/', {
            "givenName": givenName,
            "familyName": familyName,
            "email": email,
            "password": password
        }).then((response) => {
            if (response.data.customer){
                message.success("customer details registered succsess, please login with your account")
                setRegisterShow(false);
            }else{
                message.error(response.data.message)
            }
        })
    }

    const openRegister = () =>{
        setShow(false);
        setRegisterShow(true);
    }

    const onLogout = () => {
        history.push(props.path,{
            vendors: props.vendors,
            position: props.center,
            vendor: props.vendor,
        })
        message.success("Your account has been successfully logout")
    }

    const onProfile = () => {
        history.push('/profile',{
            customer: props.customer,
            password: props.password,
        })
    }


    useEffect(() => {
        if(props.customer){         
            axios.get('/order?customer=' + props.customer.id).then(response => {
                setOrders(response.data.allOrders)
            })
            setTarget('customer');
            setTitle("Welcome to LE Sillage, "+ props.customer.givenName);
            setBottons([<Nav class="justify-content-end" >
                            <Button id="marginbtn"variant="outline-light"  key = "1" 
                                onClick = {handleDrawerShow}>Order History</Button>
                            <DropdownButton as={ButtonGroup} title="My Account" variant="outline-light" >
                                <Dropdown.Item onClick={onProfile}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={onLogout} >Logout</Dropdown.Item>
                            </DropdownButton>
                        </Nav>]);
            setOrdershow([<OrderList orders={orders} 
                            target = {'customer'}
                            id = {props.customer.id} />])
        }
        else{
            setTitle("Welcome to LE Sillage")
            setBottons([<Nav class="justify-content-end">
                            <Button variant="outline-light" size = "lg" onClick = {handleShow}>Login</Button>
                        </Nav>])

        }
    }, [props.customer,props.location,props.vendor]);
    
    return(
            <Navbar collapseOnSelect id="nav" expand="md">
                <Navbar.Brand>
                <ButtonGroup>
                <Button variant="outline-light" size="" onClick = {()=>history.goBack()}>
                    <img alt="" src="/back.svg" width="30" height="50"/>
                </Button>
                <Button variant="outline-light" size="" onClick={goHomePage}>
                    <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
                </Button>
                </ButtonGroup>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbar navbar-expand-lg navbar-light bg-light" className="justify-content-end" >
                    <nav class="navbar navbar-dark">
                        <span class="navbar-brand">
                            {title}
                        </span>
                    </nav>
                    <nav>
                        {bottons}
                    </nav>
                </Navbar.Collapse>
                <Drawer visible ={drawerVisible}
                    closable = {true}
                    onClose = {handleDrawerClose}
                    width={"30%"}>
                    <h2>All Orders</h2><Divider/>
                    {ordershow}
                </Drawer>

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
                            </Form.Text>  
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                            onChange={e => setPassword(e.target.value)} /> 
                        </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" onClick={openRegister}>
                            I don't have a account yet
                        </Button>
                        <Button variant="outline-secondary" onClick={onLogin}>
                        Login
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={registerShow} onHide={registerClose} style={{ marginTop: '2vh' }} >
                    <Modal.Header closeButton>
                        <Modal.Title>Customer register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Given name</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                            onChange={e => setGivenName(e.target.value)} /> 
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Family name</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                            onChange={e => setFamilyName(e.target.value)} />
                        </Form.Group>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={onRegister}>
                        register
                        </Button>
                    </Modal.Footer>
                </Modal> 
            </Navbar>         
    )
}

export default Header;