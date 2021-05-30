import React from 'react'
import CountUp from './CountUp.js';
import axios from '../commons/axios';

import { Modal, Button } from 'react-bootstrap'; 
import { Badge, Card, notification,Divider,InputNumber,message, Rate, Input } from 'antd';
import { EyeOutlined, EditOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';

const { Meta } = Card;
const {TextArea} = Input;

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {

    constructor(props){
        super();
        this.state = {
            menu: [],
            order:[],
            diff: "",
            ratings: 0,
            comment: "",
            modalVisible: false,
            editModalVisibale: false,
            modalBody: <> </>
        }
    }

    
    handleShow = () => this.setState({modalVisible: true});
    handleEditShow = () => this.setState({editModalVisible: true});
    handleDeleteShow = () => this.setState({deleteModalVisible: true});

    handleClose = () => this.setState({modalVisible: false});
    handleEditClose = () => this.setState({editModalVisible: false});
    handleDeleteClose = () => this.setState({deleteModalVisible: false});


    onChange = (index, event) => {
        let newArray = [...this.state.order];
        newArray[index] = event;
        this.setState({order: newArray});

    }


    tick(){
        let now = new Date().getTime()
        let upd = Date.parse(this.props.order.updatedAt)
        this.setState({diff: ((now - upd) / 60000)})
    }
    componentDidMount(){
        axios.get('/snack').then(response => {
            this.setState({menu: response.data.snacks})
        })
        this.timerID = setInterval(() => this.tick(), 1000); 
    }
    componentWillUnmount(){
        clearInterval(this.timerID); 
    }
    
    handleShowOrderDetail = () => {
        console.log(this.props.order)
    }


    changeRating = (value) => {
        console.log(value)
        this.setState({ratings: value});
    };

    changeComment = (value) => {
        this.setState({comment: value});
    }

    orderEditCustomer = () => {
        console.log(this.state.diff)
        if(this.props.order.status ==="outstanding" && this.state.diff <= 10){
            this.setState({editModalVisible: true});
        }
        if(this.props.order.status ==="fulfilled"){
            notification.open({
                message:'Order is ready to be colleacted!',
                description:'You cannot make any changes to a fulfilled order, you can rate you experience after picked up',
                duration: 3
            });
        }else if(this.props.order.status=== 'outstanding' &&this.state.diff> 10){
            notification.open({
                message:'Order is being processed',
                description:'You can only update your order within 10 min after placing the order',
                duration: 3
            });
        }else if(this.props.order.status=== 'cancelled'){
            notification.open({
                message:'Order has been cancelled',
                description:'You can order later',
                duration: 3
            });
        }else{
            console.log(this.props.order)
            this.setState({editModalVisible: true});
        }
    }
    
    submitComment = () => {
        axios.post('/order/'+this.props.order._id+'/update',{
            // customer:this.props.order.customer._id,
            // vendor: this.props.order.vendor._id, //will be changed in the future
            comment: this.state.comment,
            rating: this.state.ratings
        }).then(response =>{
            if(response.data.success){
                message.success("Order has been commented!")
                this.setState({editModalVisible: false});
            }else{
                message.error("Order commenting errored!")
            }
        })
    }

    orderCancelCustomer = () => {
        console.log(this.state.diff)
        var statusToBeUpdated = ''
        if(this.props.order.status ==="outstanding" && this.state.diff <= 10){
            statusToBeUpdated = 'cancelled'
            axios.post('/order/'+this.props.order._id+'/update',{
                status: statusToBeUpdated
            }).then(response =>{
                if(response.data.success){
                    message.success("Order has been cancelled!")
                    this.setState({editModalVisible: false});
                    
                }else{
                    message.error("Order cancelled errored!")
                }
            })
        }else{
            console.log(this.props.order)
            notification.open({
                message:'Order cannot be cancelled!',
                description:'Sorry, the order is completed/ fullfiled, you cannot delete it!',
                duration: 3
            });
        }
    }

    orderStatusVendor =() =>{
        var statusToBeUpdated, discount
        var total = this.props.order.total
        if(this.props.order.status === "outstanding"){
            statusToBeUpdated = 'fulfilled'
            if(this.state.diff > 15){
                discount = true
                total = total * 0.8
            }else{
                discount = false
            }
            axios.post('/order/'+this.props.order._id+'/update',{
                total: total,
                discount: discount,
                status: statusToBeUpdated
            }).then(response =>{
                if(response.data.success){
                    message.success("Order has been fulfilled!")
                    this.setState({editModalVisible: false});
                }else{
                    message.error("Order fulfilled errored!")
                }
            })
        }else if(this.props.order.status === "fulfilled"){
            statusToBeUpdated = 'completed'
            axios.post('/order/'+this.props.order._id+'/update',{
                status: statusToBeUpdated
            }).then(response =>{
                if(response.data.success){
                    message.success("Order has been completed!")
                    this.setState({editModalVisible: false});
                }else{
                    message.error("Order completed errored!")
                }
            })
        }else{
            notification.open({
                message:"order is already completed",
                description:"comgratulations! you have completed this order",
                duration: 3
            });
        }
    }

    actionsDiff = () => {
        if(window.location.pathname === "/orders"){
            return(
            [
                    <EyeOutlined onClick = {()=> this.handleShow()} />,
                    <CheckOutlined onClick = {()=> this.orderStatusVendor()} />
            ]
            )
        }else {
            return (
                [
                    <EyeOutlined onClick = {() => this.handleShow()} />, 
                    <EditOutlined onClick = {() => this.orderEditCustomer()}/>,
                    <CloseOutlined onClick = {() => this.orderCancelCustomer()}/>
                ]
            )
        }
    }

    submitOrder = () => {
            var submitOrder = []
            var total = 0
            for (var i = 0; i < this.state.order.length; i++){

                let update = total + this.state.menu[i].price * this.state.order[i]
                total = update

                if(Number.isFinite(this.state.order[i])){
                    submitOrder.push({
                        "name":this.state.menu[i].name,
                        "qty":this.state.order[i]
                    })
                }
            }
            if (submitOrder.length ===0){
                this.setState({editModalVisible: false});
                message.error("You need to enter more than one snack!")
            }else{
                axios.post('/order/'+this.props.order._id+'/update',{
                    // customer:this.props.order.customer._id,
                    // vendor: this.props.order.vendor._id, //will be changed in the future
                    total: total,
                    snacks: submitOrder,
                    status:"outstanding"
                }).then(response =>{
                    if(response.data.success){
                        message.success("Order has been updated!")
                        this.setState({editModalVisible: false});
                        submitOrder = []
                    }else{
                        message.error("Order updating errored!")
                    }
                })
            }
            
    }

    editMenuContent = ()=>{
        if(this.props.order.status ==="outstanding"){
            return(
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{"OrderId:" + this.props.order._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.menu.map((snack, index) =>(
                            <Card style={{marginBottom:"2vh"}}size={"small"} key={snack._id}>
                                <Meta
                                    title={snack.name + "    $" + snack.price}
                                />
                                <Divider style={{borderWidth:5, borderColor: '#593e34' }} plain>
                                </Divider>
                                <InputNumber key ={snack._id} min={0} defaultValue={0} style ={{marginLeft:"80%"}} onChange={e => this.onChange(index, e)} />
                                    
                            </Card>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={() => this.submitOrder()}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </>
            )
        }else{
            return(
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{"OrderId:" + this.props.order._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Vendor:{this.props.order.vendor.name}</p>
                        <p>Snacks:{this.props.order.snacks.map((snack)=> <li key={snack.name}>{snack.name} - qty: {snack.qty}</li>)}</p>
                        <Divider>Rate your experience</Divider>
                        <p>Ratings:</p><Rate onChange={(e) => this.changeRating(e)}/>
                        <Divider></Divider>
                        <p>Comment</p><TextArea rows={4} onChange={(e) => this.changeComment(e.target.value)}/>
                        {/* {this.state.ratings ? <span className="ant-rate-text">{desc[this.state.ratings - 1]}</span> : ''} */}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={() => this.submitComment()}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </>

            )
        }
    }

    render() {

        return (
            <>
                <Modal show={this.state.modalVisible} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"OrderId: " + this.props.order._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Vendor: {this.props.order.vendor._id}</p>
                        <p>Snacks: {this.props.order.snacks.map((snack) => <li key={snack.name}>{snack.name} - qty: {snack.qty}</li>)}</p>
                        {(this.props.order.discount) ? <p>Total: {(this.props.order.total * 1.25).toFixed(2)} * 0.8 = {this.props.order.total.toFixed(2)}</p> : <p>Total: {this.props.order.total}</p>} 
                        {(this.props.order.rating) ? <><p>Rating: </p><Rate disabled value = {this.props.order.rating} /></> : <></>}
                        {(this.props.order.comment) ? <><p>Comment: </p><>{this.props.order.comment} </></> : <></>}
                    </Modal.Body>
                </Modal>

                <Modal show = {this.state.editModalVisible} onHide={()=> this.handleEditClose()}>

                    {this.editMenuContent()}

                </Modal>
                {this.props.order.discount ? 
                    <Badge.Ribbon text = "order has been discount">
                        <Card style = {{margin: "10px"}}
                            actions = {this.actionsDiff()}>
                            <Meta title = {this.props.order.vendor.name + ' - ' + this.props.order.status} />
                            {(this.props.order.status === "fulfilled") ? "Order is fulfilled"
                                :(this.props.order.status === "completed") ? "Order is completed"
                                    :<CountUp updatedAt={this.props.order.updatedAt} />}
                        </Card>
                </Badge.Ribbon> 
                :
                <Card style={{margin: "10px"}} 
                actions={this.actionsDiff()}>
                    <Meta  title={this.props.order.vendor._id + " - " + this.props.order.status}/>
                    {(this.props.order.status === "fulfilled") ? "Order is fulfilled"
                        : (this.props.order.status === "completed") ? "Order is completed"
                            : (this.props.order.status === "cancelled") ? "Order is cancelled"
                                : (this.props.order.status === "outstanding") ? "Order is outstanding"
                                :<CountUp updatedAt={this.props.order.updatedAt} />}

                </Card>}
            </>
        )
    }
}