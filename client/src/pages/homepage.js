import 'antd/dist/antd.css';
import '../pages/main.css';
import LeafletMap  from '../components/LeafletMap.js';
import Header from '../components/header';


export default function CustomerMain(props) {

    console.log(props)
    return (
        <>
            <Header customer ={props.location.state.customer}
                    vendors = {props.location.state.vendors}
                    center = {props.location.state.position}
                    path = {props.location.pathname}/>
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        customer = {props.location.state.customer} />
        </>
    )
}   