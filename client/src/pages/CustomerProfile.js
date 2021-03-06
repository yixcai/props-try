import React, {useState} from 'react'
import { Button, Form, Input, Divider, Typography, message, BackTop } from 'antd';
import axios from '../commons/axios.js';
import Header from '../components/header.js';
import './main.css';
export default function CustomerProfile(props) {

    const [form] = Form.useForm();
    const { Link } = Typography;

    const [givenName,setGivenName] = useState(props.location.state.customer.givenName);
    const [familyName,setFamilyName] = useState(props.location.state.customer.familyName);
    const [email,setEmail] = useState(props.location.state.customer.email);
    const [password,setPassword] = useState(props.location.state.customer.password);
    const [disable, setDisable] = useState(true);

    const enablePassword = () => {
        if(disable) {setDisable(false)}
        else{setDisable(true)}
    }

    const onSubmit = () => {
        axios.post('/customer/update/' + props.location.state.customer.id, {
            "givenName": givenName,
            "familyName": familyName,
            "email": email,
            "password": password
        }).then((response,err) => {
            if (response.data.success){
                message.success("Your details have been updated succsessfully!")
            }else{
                message.error(response.data.error)
            }
        }).catch(error =>{
            message.error("Sorry, another customer has already registered with this email!")
        })
    }
    console.log(props)
    
    return (
        <>
            <Header customer={props.location.state.customer}
                    path = {"/"}/>
            <div id="profile" >
                <Form form={form} layout="vertical">
                    <Form.Item label="Your Given Name">
                        <Input placeholder="given name" defaultValue={givenName}
                            onChange={e => setGivenName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Your Family Name">
                        <Input placeholder="family name" defaultValue={familyName}
                            onChange={e => setFamilyName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Your Email">
                        <Input placeholder="email" defaultValue={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                    <Divider>
                        Click <Link onClick={enablePassword} target="_blank">
                            here
                        </Link> to change password
                    </Divider>
                    <Form.Item label="Your Password">
                        <Input placeholder="password" 
                            type = "password"
                            defaultValue={props.location.state.customer.password}
                            disabled={disable}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="dark" onClick={onSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}