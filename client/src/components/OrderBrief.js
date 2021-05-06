import React, { useState } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; 
import { Card, Modal } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
const { Meta } = Card;

export default function OrderBrief(props) {
    const snacks = props.order.snacks.map((snack) => <li key={snack.name}>{snack.name} - qty: {snack.qty}</li>);
    const [modalVisible, setModalVisible] = useState(false);
    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {... props}>
            feature still in progress
        </Tooltip>
    );

    return (
        <div>
            <Modal visible={modalVisible} title = {"OrderId: " + props.order._id}
                onOk={handleClose} onCancel= {handleClose}>
                <p>Vendor: {props.order.vendor._id}</p>
                <p>{snacks}</p >
            </Modal>
        
            <Card style={{ margin: "10px" }}
                actions={[<EyeOutlined onClick={handleShow} />, <OverlayTrigger
                    placement="bottom"
                    delay={{show: 250, hide: 408 }}
                    overlay= {renderTooltip}
                >
                    <EditOutlined/>
                </OverlayTrigger>]}>
                <Meta title={props.order.vendor.name + " - " + props.order.status}/>
            </Card>
        </div>
    )
}