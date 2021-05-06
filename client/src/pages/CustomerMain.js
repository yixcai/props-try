import {Component, useState, useEffect} from 'react';
import {Button, Navbar, Nav, Container, Modal} from 'react-bootstrap';
import {Divider, Drawer, Row, Col, Card, InputNumber,Avatar,PageHeader} from 'antd';
import { EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../pages/main.css';

import axios from "../commons/axios"
import Layout, { Footer } from 'antd/lib/layout/layout';
import OrderList from '../components/OrderList.js';
import Menu from '../components/Menu.js';
import LeafletMap  from '../components/LeafletMap.js';
import { message } from 'antd'; 
import { compareSync } from 'bcryptjs';
import {useHistory} from 'react-router-dom';



const{Meta}= Card;
function onChange(value) {
    console.log('changed', value);
  }


export default function CustomerMain(props) {
    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 
    const[modalVisible, setModalVisible]= useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    const [snacks, setSnacks] = useState([]);
    const[orders, setOrders] = useState([]);
    const[order, setOrder] = useState([]);

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    

    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrder(newArray);
    }
    let history = useHistory();
    const onSubmit = () => {
        if (!props.location.state.customer){
            message.error("You need to login to place order!")
            history.goBack()

        }else{
        var submitOrder = []
        for (var i = 0; i < order.length; i++){
            if(Number.isFinite(order[i])){
                submitOrder.push({
                    "name":snacks[i].name,
                    "qty":order[i]
                })
            }
        }
        axios.post('/order/create',{
            customer: props.location.state.customer.id,
            vendor:props.location.state.vendor.id, //will be changed in the future
            snacks: submitOrder
        }).then(response =>{
            if(response.data.success){
                message.success("Order has been placed!")
                setModalVisible(false)
            }else{
                message.error("Order placing errored!")
            }
        })}
    }
    console.log(props.location.state.vendor)
    useEffect(() => {
        if(props.location.state.customer){
            axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
                setOrders(response.data.allOrders)
            })
            setOptions([<Button variant = "outline-dark" key = "1"
                onClick = {handleDrawerShow}>See Orders</Button>])
        }
        axios.get('/snack').then(response => {
            setSnacks(response.data.snacks)
        })
        
    },[props.location.state.customer]); 
    
    console.log(orders)
    return (
        <>
            <Layout>
                <Navbar id="nav" >
                    <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#home">My Account</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav class="justify-content-end">
                    <Button variant="dark"
                            onClick={handleModalShow}>Start order</Button>
                        <Modal show={modalVisible} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>My cart</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {snacks.map((snack, index) =>(
                                    <Card style={{marginBottom:"2vh"}}size={"small"} key={snack._id}>
                                        <Meta
                                            title={snack.name + "    " + snack.price}
                                        />
                                        <Divider style={{borderWidth:5, borderColor: '#593e34' }} plain>
                                        </Divider>
                                        <Meta/>
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
                        <Button variant = "dark" key = "1"
                onClick = {handleDrawerShow}>See Orders</Button>
                    </Nav>
                </Navbar>

                <Drawer visible ={drawerVisible}
                    closable = {true}
                    onClose = {handleDrawerClose}
                    width={"35%"}>
                    <h2>All Orders</h2>
                    <Divider/>
                    {orders.map((order, index) =>(
                                    <Card id={order.id}
                                    style={{ width: '100%' }}
                                    actions={[
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Meta
                                    title={"Your order id is: "+order._id}
                                    description={order.snakes}
                                    />
                                </Card> 
                                ))}
                </Drawer>

                <div id="menu-container">
                    <Row id="Coffee-Row">
                        <Divider orientation="left" style={{borderWidth:2, borderColor: '#593e34' }} plain>
                            <h2>Coffee</h2>
                        </Divider>
                    {snacks.map((snack, index) =>(
                        <Col span={2}>
                        <Card id="coffeemenu" hoverable
                                cover={<img alt="" src={snack.image} ></img>}
                            >
                                <Meta title={snack.name + "    " + snack.price}/>
                            </Card>
                        </Col>
                    ))}
                    </Row>
                </div>



                    

                
            





                
                <Footer>
                    <Divider orientation="center" style={{borderWidth:2, borderColor: '#593e34' }} plain>
                        <h2>Le Sillage</h2>
                    </Divider>
                </Footer>
            </Layout>
        </>
    )
}
