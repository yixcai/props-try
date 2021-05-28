import React from 'react';
import {Button,Navbar, Nav,Modal,Form,DropdownButton,ButtonGroup,Dropdown,OverlayTrigger,Tooltip} from 'react-bootstrap';
import {useState, useEffect  } from 'react';
import {Divider, Drawer,message,Card,InputNumber} from 'antd';
import OrderList from '../components/OrderList.js';
import axios from "../commons/axios"
import {useHistory} from 'react-router-dom';



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
              password: password,
            });
            message.success("Login succsess!")
            setShow(false);
          }else{
            message.error("we dont know this account")
          }
        }).catch(error =>{
          console.log(error);
          message.error("please try again");
          setShow(false)
          })
      }
    
    const onLogout = () => {
        history.push(props.path,{
            vendors: props.vendors,
            position: props.center,
            vendor: props.vendor,
        })
        message.success("Your account has been successfully logout")
    }

    const onRegister = () =>{
        
    }

    const onProfile = () => {
        history.push('/profile',{
            customer: props.customer,
        })
    }
console.log(props.customer)
    useEffect(() => {
        if(props.customer){         
            axios.get('/order?customer=' + props.customer.id).then(response => {
                setOrders(response.data.allOrders)
            })
            setTarget('customer');
            setTitle("Welcome to LE Sillage, "+ props.customer.givenName);
            setBottons([<Nav class="justify-content-end">
                            <Button variant="outline-light"  key = "1" onClick = {handleDrawerShow}>Order History</Button>
                            <DropdownButton as={ButtonGroup} title="My Account" variant="outline-light">
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
                            <Button variant="outline-light" size = "lg" onClick = {handleShow}>Login/register</Button>
                        </Nav>])

        }
    }, [props.customer,props.location,props.vendor]);
    
    return(
            <Navbar id="nav" >
                <OverlayTrigger
                    placement = "right"
                    delay = {{show:250, hide: 300}}
                    overlay = {renderTooltip} >
                    <Button variant="outline-light" size="" onClick={goHomePage}>
                        <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
                    </Button>
                </OverlayTrigger>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbar navbar-expand-lg navbar-light bg-light">
                <nav class="navbar navbar-dark">
                    <span class="navbar-brand">
                        {title}
                    </span>
                </nav>
                </Navbar.Collapse>
                {bottons}
                <Drawer visible ={drawerVisible}
                    closable = {true}
                    onClose = {handleDrawerClose}
                    width={"35%"}>
                    <h2>All Orders</h2><Divider/>
                    {ordershow}
                </Drawer>

                <Modal id ="login" show={show} onHide={handleClose} style={{ marginTop: '2vh' }} >
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        close
                        </Button>
                        <Button variant="secondary" onClick={onRegister}>
                        register
                        </Button>
                        <Button variant="primary" onClick={onLogin}>
                        Login
                        </Button>
                    </Modal.Footer>
                </Modal>    
            </Navbar>         
    )
}

export default Header;