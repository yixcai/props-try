import React, {useState} from 'react'
import { Form, Input, Divider, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button} from 'react-bootstrap';
import axios from '../commons/axios.js';
import Footer from "../components/Footer.js";
import Header from '../components/header.js';
import {useHistory} from 'react-router-dom';


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

    let history = useHistory();
    const onSubmit = () => {
        const updateBody = {
            "givenName": givenName,
            "familyName": familyName,
            "email": email,
            "password": password
        }
        axios.post('/customer/update/' + props.location.state.customer.id, updateBody).then((response,err) => {
            if (response.data.success){
                message.success("Customer details update succsess!")
            }else{
                message.error(response.data.error)
            }
        }).catch(error =>{
            message.error("Another customer already registered that email")
        })
    }

    console.log(history)
    return (
        <>
            <Header customer={props.location.state.customer}
            path={"/"}/>
            <div id="profileForm" style={{ minHeight: 500 }}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Given Name">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="given name" defaultValue={givenName}
                            onChange={e => setGivenName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Family Name">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="family name" defaultValue={familyName}
                            onChange={e => setFamilyName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="email" defaultValue={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                    <Divider>
                        Click <Link onClick={enablePassword} target="_blank">
                            here
                        </Link> to change password : )
                    </Divider>
                    <Form.Item label="Password">
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="New password" /*change text in placeholder*/
                            type = "password"
                            defaultValue={props.location.state.customer.password}
                            disabled={disable}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button id="submitBtn" variant = "outline-dark" onClick={onSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <Footer />
        </>
    )
}

