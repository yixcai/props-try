import axios from "../commons/axios"
import Header from '../components/header';

import {useState} from 'react';
import { Navbar, Nav, Modal} from 'react-bootstrap';
import {Divider,Button, Row, Col, Card, InputNumber} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Layout, { Footer } from 'antd/lib/layout/layout';
import { message } from 'antd'; 
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../pages/main.css';


const{Meta}= Card;

export default function CustomerMain(props) {

    //initial the constant that is used in presentation

    const[modalVisible, setModalVisible]= useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    //initial the constant that will used to stored data from db or previous pages     
    const [snacks, setSnacks] = useState([]);
    const[order, setOrder] = useState([]);
    
    
    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrder(newArray);
    }

    //not log in -> push  back to the login page
    let history = useHistory();
    const onSubmit = () => {
        if (!props.location.state.customer){
            message.error("Sorry, you have to login before ordering")
            setModalVisible(false);
            history.push(props.location.pathname,{
                customer: props.location.state.customer,
                vendor: props.location.state.vendor
            })
        }else{
        // change the order format and store in the db "orders" cluster
        var submitOrder = []
        var total = 0

        for (var i = 0; i < order.length; i++){
            total = total + snacks[i].price * order[i]
            if(Number.isFinite(order[i])){
                submitOrder.push({
                    "name":snacks[i].name,
                    "qty": order[i]
                })
            }
        }

        if (submitOrder.length ==0){
            setModalVisible(false)
            message.error("Sorry, you cannot enter empty snacks~")
        }else{
            message.loading({ content: 'Processing...'});
            // post the order info 
            axios.post('/order/create',{
                customer: props.location.state.customer.id,
                vendor: props.location.state.vendor, 
                snacks: submitOrder,
                total : total
            }).then(response =>{
                if(response.data.success){
                    setTimeout(() => {message.success({ content: "Congrats! Your order is received and you can pick up later!", duration: 2 })},500);
                    setModalVisible(false)
                    setOrder([])
                }else{
                    setTimeout(() => {message.error({ content: "Sorry, your order is failed to record! Please try again later!",duration: 2 })},500);
                }
            })
        }
    }
}

    // can check processing order that ordered by this customerID
    axios.get('/snack').then(response => {
        setSnacks(response.data.snacks)
    })
    

    //front end design
    return (
        <>
            <Header customer ={props.location.state.customer}
                    vendors = {props.location.state.vendors}
                    center = {props.location.state.position}
                    path = {props.location.pathname}
                    vendor={props.location.state.vendor}/>
            <Layout>
                <Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                    <Nav class="justify-content-end">
                    <Button icon={<ShoppingCartOutlined />}
                            onClick={handleModalShow} size="large">Order here</Button>
                        <Modal show={modalVisible} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>My cart</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {snacks.map((snack, index) =>(
                                    <Card style={{marginBottom:"2vh"}}size={"small"} key={snack._id}>
                                        <Meta
                                            title={snack.name + "  $" + snack.price}
                                        />
                                        <Divider style={{borderWidth:5, borderColor: '#593e34' }} plain>
                                        </Divider>
                                        <Meta/>
                                        <InputNumber key ={snack._id} min={0} defaultValue={order[index]} style ={{marginLeft:"0%"}} onChange={e => onChange(index, e)} />
                                            
                                    </Card>
                                ))}

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="dark" onClick={onSubmit}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Nav>
                </Navbar>

                <div id="menu-container">
                    <Row id="Coffee-Row">
                        <Divider orientation="left" style={{borderWidth:2, borderColor: '#593e34' }} plain>
                            <h2>All Products - Le Sillage</h2>
                        </Divider>
                    {snacks.map((snack, index) =>(
                        <Col xs={12} sm={4} md={6} lg={6}>
                        <Card id="coffeemenu" hoverable
                                cover={<img alt="" src={snack.image} ></img>}
                            >
                                <Meta title={snack.name + "    " + snack.price}/>
                                <Divider style={{borderWidth:5, borderColor: '#593e34' }} plain></Divider>
                                <Meta description={snack.detail} />
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