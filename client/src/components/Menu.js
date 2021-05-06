import React, {useState} from 'react'
import {InputNumber, Card, message} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import axios from '../commons/axios';
const {Meta} = Card;

export default function Menu(props){

    const[order, setOrder] = useState([]);
    const[modalVisible, setModalVisible]= useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrder(newArray);

    }

    const onSubmit = () => {
        var submitOrder = []
        for (var i = 0; i < order.length; i++){
            if(Number.ifFinite(order[i])){
                submitOrder.push({
                    "name":props.snacks[i].name,
                    "qty":order[i]
                })
            }
        }
        axios.post('/order/create',{
            customer:props.customer,
            vendor:"606af49170663322889fb26a", //will be changed in the future
            snacks: submitOrder
        }).then(response =>{
            if(response.data.success){
                message.success("Order has been placed!")
                setModalVisible(false)
            }else{
                message.error("Order placing errored!")
            }
        })
    }

    return(
        <>
            <Button variant="primary"
                onClick={handleModalShow}>Start order</Button>
            <Modal show={modalVisible} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.snacks.map((snack, index) =>(
                        <Card cover={<img alt="example" src={snack.photo} />}style={{marginBottom:"2vh"}}size={"small"} key={snack._id}>
                            <Meta
                                title={snack.name + "    $" + snack.price}
                            />
                            <InputNumber key ={snack._id} min={0} defaultValue={0} style ={{marginLeft:"80%"}} onChange={e => onChange(index, e)} />
                                
                        </Card>
                    ))}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onCLick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}