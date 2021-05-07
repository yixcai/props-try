import 'antd/dist/antd.css';
import '../pages/main.css';
import LeafletMap  from '../components/LeafletMap.js';
import {PageHeader} from 'antd';


export default function CustomerMain(props) {

    return (
        <>
            <PageHeader title = {"Welcome, Please select the vendor"}>
            </PageHeader>
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        customer = {props.location.state.customer}
                        />
        </>
    )
}   