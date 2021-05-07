import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from "leaflet";
import {Button} from 'react-bootstrap';
import {useHistory} from "react-router-dom";


export default function LeafletMap(props) {
    const vendorIcon = new Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg',
        iconSize: [30,30]
    })

    let history = useHistory()
    const Log = (vendor) => {
        history.push('/menue',{
        customer : props.customer,
        vendor: vendor
    });}
        return (
        <>
            <MapContainer 
            center={props.center} zoom={18} scrollWheelZoom={false} style={{height: "90vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'                  
                />
                <Marker position={props.center} iconUrl = {"https://static.thenounproject.com/png/780108-200.png"}>
                    <Popup>Your location is here </Popup>
                </Marker>
                {
                    props.vendors.map((vendor) => (
                        <Marker position={vendor.location} icon = {vendorIcon}>
                            <Popup > {" distance to you is: " + 
                            (Math.sqrt(Math.hypot(
                                vendor.location[0] - props.center[0],
                                vendor.location[1] - props.center[1]
                                 ))*111).toFixed(2)+"km"}
                            <Button variant="primary" onClick={() =>Log(vendor)}>
                                Order from this Vendor
                            </Button>
                            </Popup>

                        </Marker>
                    ))
                }
            </MapContainer>
        </>
    )
}