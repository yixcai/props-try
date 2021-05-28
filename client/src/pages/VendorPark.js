import React from 'react'
import LeafletMap  from '../components/LeafletMap.js';
import Header from '../components/vendorHeader';


export default function VendorPark(props) {
    return (
        <div>
            <Header id  = {props.location.state.vendor.id} vendor = {props.location.state.vendor}/>
            <LeafletMap center = {props.location.state.position}
                        vendor = {props.location.state.vendor}
                        vendors = {[]}//如果传进来，可以获得最近的小车车
                        />
        </div>
    )
}
