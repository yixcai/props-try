import React from 'react'
import LeafletMap  from '../components/LeafletMap.js';
import Header from '../components/vendorHeader';


export default function VendorPark(props) {
    return (
        <div>
            <Header id  = {props.location.state.vendor.id} vendor = {props.location.state.vendor}/>
            <LeafletMap center = {props.location.state.position}
                        vendor = {props.location.state.vendor}
                        vendors = {[]}
                        />
        </div>
    )
}
