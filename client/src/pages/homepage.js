import 'antd/dist/antd.css';
import '../pages/main.css';
import LeafletMap  from '../components/LeafletMap.js';
import Header from '../components/header';
import Footer from '../components/Footer';


export default function CustomerMain(props) {

    return (
        <>
            <Header customer ={props.location.state.customer}
                    center = {props.location.state.position}
                    path = {props.location.pathname}
                    password = {props.location.state.password}/>
                    
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        customer = {props.location.state.customer} />

            <Footer/>
        </>
    )
}   