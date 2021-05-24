import React from 'react';
import {Button,Navbar, Nav,Modal,Form} from 'react-bootstrap';
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
    const [snacks, setSnacks] = useState([]);
    const[modalVisible, setModalVisible]= useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrder(newArray);
    }

    let history = useHistory();
    const goHomePage = () => {history.push('/')};

    const onSubmit = () => {
        if (!props.customer){
            message.error("Sorry, you have to login before ordering")
            history.push('/')
        }else{
            // change the order format and store in the db "orders" cluster
            var submitOrder = []
            for (var i = 0; i < order.length; i++){
                if(Number.isFinite(order[i])){
                    submitOrder.push({
                        "name":snacks[i].name,
                        "qty":order[i]
                    })
                }
            }
            if (submitOrder.length ===0){
                setModalVisible(false)
                message.error("Sorry, you cannot enter empty snacks~")
            }else{
                // post the order info 
                axios.post('/order/create',{
                    customer: props.customer.id,
                    vendor:props.vendor.id, 
                    snacks: submitOrder
                }).then(response =>{
                    if(response.data.success){
                        message.success("Congrats! Your order is received and you can pick up later!")
                        setModalVisible(false)
                    }else{
                        message.error("Sorry, your order is failed to record! Please try again later!")
                    }
                })
            }
        }
    }

    const onLogin = () => {
        axios.post("/customer/login", {email: email, password: password}).then(response => {
          if(response.data.success){
            //传递本页信息到下一页
              history.push(props.path, {
              customer : response.data.customer,
              vendors: props.vendors,
              position: props.center,
              vendor: props.vendor,
            });
            setShow(false);
          }else{
            message.error("we dont know this account")
          }
        }).catch(error =>{
          console.log(error)
          })
      }

    

    useEffect(() => {
        if(props.vendor){
            axios.get('/snack').then(response => {
                setSnacks(response.data.snacks)
            })
        }

        if(props.customer){         
            axios.get('/order?customer=' + props.customer.id).then(response => {
                setOrders(response.data.allOrders)
            })
            setTitle("Welcome to LE Sillage, "+ props.customer.givenName);
            setBottons([<Nav class="justify-content-end">
                            <Button variant="outline-light" onClick={handleModalShow}>My Cart</Button>
                            <Button variant="outline-light"  key = "1" onClick = {handleDrawerShow}>Order History</Button>
                            <Button variant="outline-light">My Account</Button>
                        </Nav>]);
        }
        else{
            setTitle("Welcome to LE Sillage")
            setBottons([<Nav class="justify-content-end">
                            <Button variant="outline-light" onClick={handleModalShow}>My Cart</Button>
                            <Button variant="outline-light" size = "lg" onClick = {handleShow}>Login</Button>
                        </Nav>])

        }
    }, [title,bottons,props.customer,props.location,props.vendor]);

    return(
            <Navbar id="nav" >
                <Button variant="outline-light" size="" onClick={goHomePage}>
                    <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
                </Button>
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
                    <OrderList orders={orders} />
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
                        Close
                        </Button>
                        <Button variant="primary" onClick={onLogin}>
                        Login
                        </Button>
                    </Modal.Footer>
                </Modal>    

                <Modal show={modalVisible} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>My cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {snacks.map((snack, index) =>(
                                <Card style={{marginBottom:"2vh"}}size={"small"} key={snack._id}>
                                    <Card
                                        title={snack.name + "    " + snack.price}
                                    />
                                    <Divider style={{borderWidth:5, borderColor: '#593e34' }} plain>
                                    </Divider>
                                    <Card/>
                                    <InputNumber key ={snack._id} min={0} defaultValue={0} style ={{marginLeft:"80%"}} onChange={e => onChange(index, e)} />
                                        
                                </Card>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={onSubmit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </Navbar> 
               
    )
}

export default Header;