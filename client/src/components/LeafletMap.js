
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from "leaflet";
import {Button,Modal,Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import axios from "../commons/axios";
import React, {useState, useMemo} from 'react';
import {message} from 'antd';

export default function LeafletMap(props) {
    const vendorIcon = new Icon({
        iconUrl: '/coffee-truck.png',
        iconSize: ["auto",30]
    })

    const [position, setPosition] = useState(props.center);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [address, setAddress] = useState('');


    const eventHandlers = useMemo(
        (e)=> ({
            dragend(e){
                console.log(e.target.getLatLng())
                setPosition(e.target.getLatLng())
            },
            click(){
                handleShow()
            }
        }),
        [],
    )

    const customerLocated = [<Marker position={props.center} iconUrl = {"https://static.thenounproject.com/png/780108-200.png"}>
                                <Popup>{'Your location is here,' + props.center} </Popup>
                            </Marker>]

    const renderVendorMarker = (
        <Marker
        draggable = {true}
        eventHandlers = {eventHandlers}
        position = {position}>
        </Marker>
    )

    const onPark = () =>{
        axios.post('/vendor/park/' + props.vendor.id, {
            location: [position.lat, position.lng],
            textAddress: address
        }).then(response=>{
            message.success("vendor successfully parked")
            history.push({pathname: '/orders', state: {vendor: props.vendor}})
        })
    }

    let history = useHistory()
    const Log = (vendor) => {
        history.push('/menue',{
        customer : props.customer,
        vendor: vendor
    });}

        return (
        <><Modal id ="vendor park" show = {show} onHide = {handleClose} style = {{marginTop: '2vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Vendor Park</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Detailed Text address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address please"
                                onChange={e => setAddress(e.target.value)} />
                            <Form.Text className="text-muted">
                                <p>Plases enter a detailed address!</p>
                            </Form.Text>  
                        </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onPark}>
                    Submit
                </Button>
            </Modal.Footer>
            </Modal>

            <MapContainer 
            center={props.center} zoom={18} scrollWheelZoom={false} style={{height: "90vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'                  
                />
                {(history.location.pathname !=='/vendor') ? customerLocated : <></>}
                {
                    props.vendors.map((vendor) => (
                        <Marker position={vendor.location} icon = {vendorIcon}>
                            <Popup >
                            <Button  variant="outline-dark" onClick={() =>Log(vendor.id)}>
                            {"Order here " +
                            (Math.sqrt(Math.hypot(
                                vendor.location[0] - props.center[0],
                                vendor.location[1] - props.center[1]
                                 ))*11).toFixed(2) + "km away from you"}
                            </Button>
                            </Popup>

                        </Marker>
                    ))
                }
                {(history.location.pathname ==='/vendor') ? renderVendorMarker : <></>}
            </MapContainer>
        </>
    )
}