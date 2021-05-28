import {useState, useEffect  } from 'react';
import {Jumbotron, Button, OverlayTrigger,Tooltip, Modal, Form,Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from '../commons/axios.js';
import { message, Typography ,Layout, Menu, } from 'antd';
import './main.css';

function App(props) { 
    const [customer, setCustomer] = useState();
    
    const[lat,setLat] = useState('');
    const[lng,setLng] = useState('');
    const[vendors,setVendors] = useState([]);
    
    useEffect(() =>{
      if(props.location.state){
        setCustomer(props.location.state.customer)
      }else{
        setCustomer(null)
      }
      navigator.geolocation.getCurrentPosition(function (position){
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      });
      axios.get('/vendor?lat='+lat+'&lng='+lng).then(response =>{
        setVendors(response.data.vendors)
      })
    },[lat,lng])
  
    const renderTooltip = (props) => (
      <Tooltip id = 'button-tooltip' {...props}>
        feature still in progess
      </Tooltip>
    );

    const onSkip = () =>{
      props.history.push('/customer',{
        position:[lat, lng],
        vendors: vendors
      });
    }

    const onVendorHome = () =>{
      props.history.push("/vendorHome")
    }
    
    return (
        <div id="appMain" >
          <Jumbotron style = {{background: "white" }}>
            <div class="row"> 
              <div id="column1">
                <img alt="" src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535d808becbf7162555033_peep-102.svg"
                width={'100%'}/>
              </div>
              <div id="column2">
                <h2> Welcome to Le Sillage!</h2>
                <p> We run a fleet of food trucks that work as popup cafes 
                offering high-quality coffee and delicious snacks.</p>
                <p>
                  <Button variant = "outline-dark" style = {{marginBottom:"1vh",marginRight:"1vw"}}
                    onClick = {onSkip}>Customer</Button>
                  <Button variant = "outline-dark" style = {{marginBottom:"1vh"}}
                    onClick = {onVendorHome}> Vendor</Button>
                </p>
              </div>
            </div>  
          </Jumbotron>
        </div>
    )
} 

export default App;