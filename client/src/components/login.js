import {Button,Navbar, Nav,Modal,Form} from 'react-bootstrap';
import {Divider, Drawer,Typography} from 'antd';
import {useState, useEffect  } from 'react';

export default function Login(props) {
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    setShow(props.show);

    return(
        <Modal show={show} onHide={handleClose} style={{ marginTop: '2vh' }} >
            <Modal.Header closeButton>
                <Modal.Title>Customer Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                    onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>  
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)} /> 
                </Form.Group>
                </Form>
                <Typography >
                Skip for now
                </Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary">
                Login
                </Button>
            </Modal.Footer>
        </Modal>
    )
} 